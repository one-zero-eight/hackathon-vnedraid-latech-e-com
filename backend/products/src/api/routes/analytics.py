from decimal import Decimal

from dishka.integrations.fastapi import DishkaRoute, FromDishka
from fastapi import APIRouter, status
from fastapi.exceptions import HTTPException
from pydantic import BaseModel

from src.repositories.item import ItemRepository
from src.schemas.seller import SellerIdScheme

router = APIRouter(tags=["Analytics"], route_class=DishkaRoute)


class RatioResponse(BaseModel):
    current: Decimal
    previous: Decimal
    ratio: int


@router.get("/total_with_percent/{days:int}")
async def get_total_income_by_period(
    days: int, item_repository: FromDishka[ItemRepository], seller: FromDishka[SellerIdScheme]
) -> RatioResponse:
    if days < 1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="number of days must be greater than 0",
        )
    prev_total, cur_total = (
        await item_repository.get_total_for_current_and_previos_number_of_days(days, seller.seller_id)
    )
    if cur_total == 0:
        ratio = -100
    elif prev_total == 0:
        ratio = 100
    elif cur_total > prev_total:
        ratio = int(cur_total / prev_total * 100)
    else:
        ratio = -int(prev_total / cur_total * 100)
    return RatioResponse(
        current=cur_total,
        previous=prev_total,
        ratio=ratio,
    )


@router.get("/average_with_percent/{days:int}")
async def get_total_income_by_period(
    days: int, item_repository: FromDishka[ItemRepository], seller: FromDishka[SellerIdScheme]
) -> RatioResponse:
    if days < 1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="number of days must be greater than 0",
        )
    prev_average, cur_average = (
        await item_repository.get_average_for_current_and_previos_number_of_days(days, seller.seller_id)
    )
    if cur_average == 0:
        ratio = -100
    elif prev_average == 0:
        ratio = 100
    elif cur_average > prev_average:
        ratio = int(cur_average / prev_average * 100)
    else:
        ratio = -int(prev_average / cur_average * 100)
    return RatioResponse(
        current=cur_average,
        previous=prev_average,
        ratio=ratio,
    )
