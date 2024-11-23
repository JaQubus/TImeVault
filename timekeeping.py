import asyncio
import datetime
import pytz
from sqlalchemy import select, delete
import models
from starlette.responses import JSONResponse
from aiosmtplib import SMTP, SMTPException
from email.mime.text import MIMEText
from jinja2 import Template, FileSystemLoader, Environment
from email.mime.multipart import MIMEMultipart

task = None

async def send_email(email_data: dict) -> JSONResponse:
    try:
        sender_email = "electrovision.auth@gmail.com"
        sender_password = "ddsm atmm sfjf mlhl"
        recipient_email = email_data['receiver']
        subject = "The time is right -> TimeVault!"
        if 'message' not in email_data:
            return JSONResponse(content={"error": "Unexpected error"}, status_code=418)

        print("EMAIL DATA: ", email_data)
        templateLoader = FileSystemLoader(searchpath="./")
        templateEnv = Environment(loader=templateLoader)
        TEMPLATE_FILE = "email_response.html"
        template = templateEnv.get_template(TEMPLATE_FILE)

        body = template.render(email_data)
        html_message = MIMEMultipart('mixed')
        html_message = MIMEText(body, 'html')
        html_message['Subject'] = subject
        html_message['From'] = sender_email
        html_message['To'] = recipient_email
        smtp_client = SMTP(hostname='smtp.gmail.com', port=465, use_tls=True)
        await smtp_client.connect()
        # await smtp_client.starttls()
        await smtp_client.login(sender_email, sender_password)
        await smtp_client.send_message(html_message)
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
                        data = await send_email(email.dict())
                        print("DATA.BODY: ", data.body)
                        await db.execute(delete(models.EmailRequestCreate).where(models.EmailRequestCreate.email_id == email.email_id))
                        print("deleted")
                    await db.commit()

            await asyncio.sleep(5) # TODO: Make this every minute
def start_task() -> None:
    global task
    task = asyncio.create_task(check_times())
