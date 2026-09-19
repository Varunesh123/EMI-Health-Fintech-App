from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import settings
from app.db.mongodb import close_mongodb
from app.db.redis import close_redis


@asynccontextmanager
async def lifespan(app: FastAPI):

    print("🚀 Starting EMI Health API")

    yield

    print("🛑 Shutting down EMI Health API")

    await close_mongodb()
    await close_redis()


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description=(
        "Fintech API for EMI management, "
        "financial health, risk analysis and GenAI."
    ),
    lifespan=lifespan,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins="http://localhost:8443",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(api_router)