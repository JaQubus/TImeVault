from pydantic.types import Json
from sqlalchemy.ext.asyncio.session import async_sessionmaker
from starlette.responses import JSONResponse
import uvicorn
from fastapi import FastAPI, Request, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
import models
from sqlalchemy import select, and_
import hashlib
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from smtplib import SMTP
from timekeeping import start_task
from email.message import EmailMessage
from contextlib import asynccontextmanager
from email.mime.text import MIMEText
import uuid
from models import EmailRequestCreateSchema, EmailRequestCreate


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting up")
    start_task()
    yield
    task.cancel()
    try:
        await task
    except asyncio.CancelledError:
        print("Background task was cancelled.")

app = FastAPI(lifespan=lifespan)
# bro did NOT cook anything

Session = async_sessionmaker(bind=models.engine)
session = Session()

@app.post("/login")
async def login(request: Request, db: AsyncSession = Depends(models.get_db)) -> JSONResponse:
    try:
        data = await request.json()
        print(data)
        async with db.begin():
            # print("1")
            query = await db.execute(select(models.User).
            where(
                and_(
                    models.User.email == data["email"],
                    models.User.password == await hash_password(data["password"])
                )
            )
            )
            print(query)

            user_data = query.scalar()
            user_id = user_data.user_id

        if user_data is None:
            return JSONResponse(content={"Error": "User not found"}, status_code=404)

        # user_id = user_data["user_id"]
        # print("\n\n\n\n\n", user_id)

        return JSONResponse(content={"Success": "User logged in successfully", "user_id": user_id}, status_code=200)

    except Exception as e:
        print(e)
        return JSONResponse(content={"Error": f"Unexpected Error {e}"}, status_code=500)


@app.get("/send_email/{email_data}")
async def send_email(email_data: str, db: AsyncSession = Depends(models.get_db)) -> JSONResponse:
    try:
        sender_email = "electrovision.auth@gmail.com"
        sender_password = "ddsm atmm sfjf mlhl"
        recipient_email = "lekstomek602@gmail.com"
        subject = "Hello from Python"
        body = """
        <html>
          <body>
            <p>This is an <b>HTML</b> email sent from Python using the Gmail SMTP server.</p>
          </body>
        </html>
        """
        html_message = MIMEText(body, 'html')
        html_message['Subject'] = subject
        html_message['From'] = sender_email
        html_message['To'] = recipient_email
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
                server.starttls()
                server.login(sender_email, sender_password)
                server.sendmail(sender_email, recipient_email, html_message.as_string())
                print("Email sent successfully!")

        return JSONResponse({"success": True, "message": "Email sent to"})

    except smtplib.SMTPException as e:
        return JSONResponse(content={"error": f"Unexpected error: {e}"}, status_code=418)

    except Exception as e:
        return JSONResponse(content={"error": f"Unexpected error: {e}"}, status_code=418)

@app.post("/create_message")
async def create_message(request_data: EmailRequestCreateSchema, db: AsyncSession = Depends(models.get_db)) -> JSONResponse:
    if not db:
        raise HTTPException(status_code=500, detail="Database session is None")
    email_request_create = EmailRequestCreate(**request_data.dict())
    try:
        async with db.begin():
            db.add(email_request_create)
            await db.commit()
            await db.refresh(email_request_create)

        return JSONResponse(content={"success": True}, status_code=200) # email_request.dict()
    except Exception as e:
        await db.rollback()  # Roll back in case of an error
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")


async def hash_password(password):
    password_bytes = password.encode('utf-8')
    hash_object = hashlib.sha256(password_bytes)
    return hash_object.hexdigest()

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True, host="127.0.0.1", port=8000)
