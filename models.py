from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
import uuid
from sqlalchemy.orm import declarative_base, Mapped, mapped_column
from sqlalchemy import String
from pydantic import BaseModel, EmailStr


from sqlalchemy_utils import UUIDType

Base = declarative_base()

engine = create_async_engine('sqlite+aiosqlite:///sqlalchemy.sqlite', echo=False)
SessionLocal = async_sessionmaker(engine)


def generate_uuid():
    return int(uuid.uuid4())

async def get_db() -> AsyncSession:
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    await SessionLocal().close()
    return SessionLocal()

class UserCreate(BaseModel):
    user_id: uuid.UUID
    email: EmailStr
    username: str
    password: str

class User(Base):
    __tablename__ = "users"

    user_id: Mapped[uuid.UUID] = mapped_column("user_id", UUIDType(binary=False), primary_key=True, index=True)

    email: Mapped[String] = mapped_column("email", String, nullable=False, unique=True)
    username: Mapped[String] = mapped_column("username", String, nullable=False)
    password: Mapped[String] = mapped_column("password", String, nullable=False)

    def __init__(self, user_id, email, username, password, sex, image):
        self.user_id = user_id
        self.email = email
        self.username = username
        self.password = password

    def dict(self):
        return {
            "id": self.user_id,
            "email": self.email,
            "name": self.username,
        }
