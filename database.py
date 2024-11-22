from models import engine
import uuid

async def create_email_request(user_id: uuid.UUID, sender: str, receiver: str) -> dict:
    # Create a new emailrequest in the database. 
    try:
        new_email_request = EmailRequestCreate(
            user_id=user_id,
            sender=sender,
            receiver=receiver
        )

        db.add(new_email_request)
        db.commit()
        await db.refresh(new_email_request)

        return new_email_request.dict()
    except Exception as e:
        await db.rollback()  # Roll back in case of an error
        raise ValueError("Couldn't create message request.") 