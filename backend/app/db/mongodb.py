from pymongo import AsyncMongoClient

from app.core.config import settings


mongo_client = AsyncMongoClient(settings.MONGODB_URL)

mongo_database = mongo_client[settings.MONGODB_DATABASE]


async def close_mongodb() -> None:
    await mongo_client.close()