from pydantic import BaseModel, ConfigDict


class BrandRead(BaseModel):
    id: int
    name: str
    seller_id: int

    model_config = ConfigDict(from_attributes=True)


class BrandCreate(BaseModel):
    name: str
    seller_id: int


class BrandUpdate(BaseModel):
    name: str | None = None
    seller_id: int | None = None
