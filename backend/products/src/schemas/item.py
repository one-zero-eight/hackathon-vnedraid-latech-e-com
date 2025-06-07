from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ItemInRead(BaseModel):
    id: int
    product_id: int
    count: int
    added: datetime

    model_config = ConfigDict(from_attributes=True)


class ItemInCreate(BaseModel):
    product_id: int
    count: int


class ItemInUpdate(BaseModel):
    count: int | None = None


class ItemOutRead(BaseModel):
    id: int
    product_id: int
    order_id: int
    count: int

    model_config = ConfigDict(from_attributes=True)


class ItemOutCreate(BaseModel):
    product_id: int
    order_id: int
    count: int


class ItemOutUpdate(BaseModel):
    count: int | None = None
