import asyncio
import datetime
import pytz
from sqlalchemy import select, delete
import models
from starlette.responses import JSONResponse
from aiosmtplib import SMTP, SMTPException
from email.mime.text import MIMEText
from importlib.resources import contents

async def send_email(email_data: dict) -> JSONResponse:
    try:
        sender_email = "electrovision.auth@gmail.com"
        sender_password = "ddsm atmm sfjf mlhl"
        recipient_email = email_data['receiver']
        subject = "Hello from Python"
        if 'message' not in email_data:
            return JSONResponse(content={"error": "Unexpected error"}, status_code=418)
        body = f"""
        <html>
          <body>
            <p>{email_data["message"]}</p>
          </body>
        </html>
        """
        html_message = MIMEText(body, 'html')
        html_message['Subject'] = subject
        html_message['From'] = sender_email
        html_message['To'] = recipient_email
        smtp_client = SMTP(hostname='smtp.gmail.com', port=465, use_tls=True)
        await smtp_client.connect()
        # await smtp_client.starttls()
        await smtp_client.login(sender_email, sender_password)
        await smtp_client.send_message(html_message)
        print("EMAIL DATA: ", email_data)
        return JSONResponse({"success": True, "message": "Email sent to"}, status_code=200)

    except SMTPException as e:
        return JSONResponse(content={"error": f"Unexpected error: {e}"}, status_code=418)

    except Exception as e:
        return JSONResponse(content={"error": f"Unexpected error: {e}"}, status_code=418)


tz_cet = pytz.timezone('Europe/Warsaw')

async def check_times() -> None:
    # TODO: Fetch times from database
    async with await models.get_db() as db:
        while True:
            query = await db.execute(select(models.EmailRequestCreate))
            rows = query.all()
            for row in rows:
                for email in row:
                    local_time = tz_cet.localize(email.date_to_send)
                    if datetime.datetime.now(tz_cet) > local_time:
                        print(email.dict())
                        data = await send_email(email.dict())
                        print(data.body)
                        await db.execute(delete(models.EmailRequestCreate).where(models.EmailRequestCreate.email_id == email.email_id))
                        print("deleted")
                    await db.commit()

            await asyncio.sleep(5) # TODO: Make this every minute
def start_task() -> None:
    asyncio.create_task(check_times())
