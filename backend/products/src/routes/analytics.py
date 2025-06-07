from fastapi import APIRouter
from dishka.integrations.fastapi import FromDishka
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime


router = APIRouter(tags=["Analytics"])


# @router.get("/total_with_percent/{days:int}")
# async def get_total_income_by_period(days: int, session: FromDishka[AsyncSession]):
#     past_days 
