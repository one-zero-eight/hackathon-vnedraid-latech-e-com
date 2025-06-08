from datetime import datetime
from typing import TYPE_CHECKING

from pydantic import BaseModel, ConfigDict

from src.db.models import OrderStatus

if TYPE_CHECKING:
    from src.schemas.item import ItemOutCreate, ItemOutRead


class OrderRead(BaseModel):
    id: int
    status: OrderStatus
    sold_datetime: datetime
    order_items: list["ItemOutRead"] = []

    model_config = ConfigDict(from_attributes=True)


class OrderCreate(BaseModel):
    status: OrderStatus = OrderStatus.PENDING
    order_items: list["ItemOutCreate"] = []


class OrderUpdate(BaseModel):
    status: OrderStatus | None = None
