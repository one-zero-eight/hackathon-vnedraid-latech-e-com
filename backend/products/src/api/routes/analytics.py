from decimal import Decimal

from dishka.integrations.fastapi import DishkaRoute, FromDishka
from fastapi import APIRouter, status
from fastapi.exceptions import HTTPException
from fastapi.responses import JSONResponse
from src.schemas.responses import RatioResponse, IntervalWithCountResponse

from src.repositories.item import ItemRepository
from src.schemas.seller import SellerIdScheme

router = APIRouter(tags=["Analytics"], route_class=DishkaRoute)


@router.get("/total_with_percent/{days:int}")
async def get_total_income_by_period(
    days: int, item_repository: FromDishka[ItemRepository], seller: FromDishka[SellerIdScheme]
) -> RatioResponse:
    if days < 1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="number of days must be greater than 0",
        )
    prev_total, cur_total = await item_repository.get_total_for_current_and_previos_number_of_days(
        days, seller.seller_id
    )
    diff = abs(prev_total - cur_total)
    if cur_total == 0:
        ratio = -100
    elif prev_total == 0:
        ratio = 100
    elif cur_total > prev_total:
        ratio = int(diff / prev_total * 100)
    else:
        ratio = -int(diff / prev_total * 100)
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
    prev_average, cur_average = await item_repository.get_average_for_current_and_previos_number_of_days(
        days, seller.seller_id
    )
    diff = abs(prev_average - cur_average)
    if cur_average == 0:
        ratio = -100
    elif prev_average == 0:
        ratio = 100
    elif cur_average > prev_average:
        ratio = int(diff / prev_average * 100)
    else:
        ratio = -int(diff / prev_average * 100)
    return RatioResponse(
        current=cur_average,
        previous=prev_average,
        ratio=ratio,
    )


@router.get("/count_with_percent/{days}")
async def get_total_bought_products_by_period(
    days: int, item_repository: FromDishka[ItemRepository], seller: FromDishka[SellerIdScheme]
) -> RatioResponse:
    if days < 1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="number of days must be greater than 0",
        )
    prev_count, cur_count = await item_repository.get_total_bought_products_for_current_and_previos_number_of_days(
        days, seller.seller_id
    )
    diff = abs(cur_count - prev_count)
    if cur_count == 0:
        ratio = -100
    elif prev_count == 0:
        ratio = 100
    elif cur_count > prev_count:
        ratio = int(diff / prev_count * 100)
    else:
        ratio = -int(diff / prev_count * 100)
    return RatioResponse(
        current=cur_count,
        previous=prev_count,
        ratio=ratio,
    )


@router.get("/categories_with_count/{days:int}")
async def get_categories_with_count_bought_items(
    days: int, item_repository: FromDishka[ItemRepository], seller: FromDishka[SellerIdScheme]
) -> JSONResponse:
    if days < 1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="number of days must be greater than 0",
        )
    return await item_repository.get_categories_with_number_of_bought_items(days, seller.seller_id)


@router.get('/count_bought_by_intervals/{days:int}/{intervals:int}')
async def get_count_bought_items_by_intervals(days: int, intervals: int, item_repository: FromDishka[ItemRepository], seller: FromDishka[SellerIdScheme]) -> list[IntervalWithCountResponse]:
    if days < 1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="number of days must be greater than 0",
        )
    if not (2 <= intervals <= 12):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="number of intervals must be between 2 and 12",
        )
    return await item_repository.get_count_bought_items_by_intervals(days, intervals, seller.seller_id)
