from pydantic import BaseModel, ConfigDict

from src.db.models import ProductStatus

from src.schemas.brand import BrandRead
from src.schemas.category import CategoryRead
from src.schemas.comment import CommentRead
from src.schemas.item import ItemInRead, ItemOutRead


class ProductRead(BaseModel):
    id: int
    name: str
    price: float
    discount_price: float
    img_url: str
    count: int
    description: str
    size_width: int
    size_height: int
    size_depth: int
    lamoda_sku: str
    status: ProductStatus
    brand: BrandRead
    category: CategoryRead
    comments: list[CommentRead] = []

    items_in: list[ItemInRead] = []
    items_out: list[ItemOutRead] = []

    model_config = ConfigDict(from_attributes=True)


class ProductCreate(BaseModel):
    name: str
    price: float
    discount_price: float
    img_url: str
    count: int
    description: str
    size_width: int
    size_height: int
    size_depth: int
    lamoda_sku: str
    status: ProductStatus = ProductStatus.INACTIVE

    brand_id: int
    category_id: int


class ProductUpdate(BaseModel):
    name: str | None = None
    price: float | None = None
    discount_price: float | None = None
    img_url: str | None = None
    count: int | None = None
    description: str | None = None
    size_width: int | None = None
    size_height: int | None = None
    size_depth: int | None = None
    lamoda_sku: str | None = None
    status: ProductStatus | None = None
    brand_id: int | None = None
    category_id: int | None = None
