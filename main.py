from sqlalchemy.ext.asyncio.session import async_sessionmaker
import uvicorn
from fastapi import FastAPI
from sqlalchemy.orm import sessionmaker
import models

app = FastAPI()
# bro did NOT cook anything

Session = async_sessionmaker(bind=models.engine)
session = Session()

app.mount("/", app)

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True, host="127.0.0.1", port=8000)
