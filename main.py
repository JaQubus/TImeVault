from sqlalchemy.ext.asyncio.session import async_sessionmaker
from starlette.responses import JSONResponse
import uvicorn
from fastapi import FastAPI, Request, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
import models
from sqlalchemy import select, and_
import hashlib
from timekeeping import start_task
from contextlib import asynccontextmanager
import uuid
from models import EmailRequestCreateSchema, EmailRequestCreate
from sqlalchemy.exc import SQLAlchemyError
from pprint import pprint
from timekeeping import task
import asyncio

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
            if user_data is None:
                return JSONResponse(content={"Error": "User not found"}, status_code=404)
            user_id = user_data.user_id


        # user_id = user_data["user_id"]
        # print("\n\n\n\n\n", user_id)

        return JSONResponse(content={"Success": "User logged in successfully", "user_id": user_id, "email": user_data.email}, status_code=200)

    except Exception as e:
        print(e)
        return JSONResponse(content={"Error": f"Unexpected Error {e}"}, status_code=500)

@app.post("/login/register")
async def create_user(request: Request, db: AsyncSession = Depends(models.get_db)):

    try:
        data = await request.json()
        print(data)

        data["user_id"] = uuid.uuid4()

        user_data = models.UserCreate.model_validate(data)

        if len(user_data.password) < 3:
            raise HTTPException(status_code=400, detail="Password is too short min 4 chars required")

        user_data.password = await hash_password(user_data.password)
        db_user = models.User(**user_data.model_dump())
        db.add(db_user)

        data["password"] = user_data.password
        data["user_id"] = str(user_data.user_id)

        await db.commit()
        await db.refresh(db_user)
        await db.close()
        return JSONResponse(content={"Success": "User created successfully"}, status_code=200)

    except SQLAlchemyError as sqle:
        print(sqle)
        return JSONResponse(content={"Error": f"Sql error {sqle}"}, status_code=500)
    except Exception as e:
        print(e)
        return JSONResponse(content={"Error": f"Unexpected error {e}"}, status_code=500)


@app.post("/create_message")
async def create_message(request_data: EmailRequestCreateSchema, db: AsyncSession = Depends(models.get_db)) -> JSONResponse:
    pprint(request_data)
    email_request_create = EmailRequestCreate(**request_data.dict())
    try:
        async with db:
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
    uvicorn.run("main:app", reload=True, host="0.0.0.0", port=8000)
