from pydantic import BaseModel
from decimal import Decimal
from datetime import date


class RatioResponse(BaseModel):
    current: Decimal
    previous: Decimal
    ratio: int


class IntervalWithCountResponse(BaseModel):
    start_date: date
    end_date: date
    count: int
