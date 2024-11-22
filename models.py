from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
import uuid

engine = create_async_engine('sqlite+aiosqlite:///sqlalchemy.sqlite', echo=False)
SessionLocal = async_sessionmaker(engine)


def generate_uuid():
    return int(uuid.uuid4())
