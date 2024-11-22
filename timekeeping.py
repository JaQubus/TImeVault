import asyncio
import datetime
import pytz

tz_cet = pytz.timezone('Europe/Warsaw')

fake_db = [
    {
        'date_to_send': datetime.datetime(2024, 11, 22),
        'time_to_send': datetime.time(12, 0),
        'message': 'Hey bro, hows it going cuh',
        'sent': False
    },
    {
        'date_to_send': datetime.datetime(2023, 11, 21),
        'time_to_send': datetime.time(12, 0),
        'message': 'This should print as well',
        'sent': False
    },
        {
        'date_to_send': datetime.datetime(5204, 11, 21),
        'time_to_send': datetime.time(12, 0),
        'message': 'Lol it broke if it prints',
        'sent': False
    },
    
]

async def check_times() -> None:
    # TODO: Fetch times from database
    while True:
        now_time = datetime.datetime.now(tz_cet)
        for i, entry in enumerate(fake_db):
            # TODO: Check hour
            send_date = tz_cet.localize(entry['date_to_send'])
            if now_time > send_date and not entry['sent']:
                # TODO: Send message here
                print(entry['message'])

                entry['sent'] = True

        await asyncio.sleep(5) # TODO: Make this every minute

def start_task() -> None:
    asyncio.create_task(check_times())