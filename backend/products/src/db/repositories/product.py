from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload, selectinload

from src.db.models import Product, ProductStatus
from src.schemas.product import ProductCreate, ProductUpdate


class ProductRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get(self, id: int) -> Product | None:
        result = await self.session.execute(select(Product).where(Product.id == id))
        return result.scalar_one_or_none()

    async def get_all(self, skip: int = 0, limit: int = 100) -> list[Product]:
        result = await self.session.execute(select(Product).offset(skip).limit(limit))
        return result.scalars().all()

    async def create(self, data: ProductCreate) -> Product:
        obj = Product(**data.model_dump(exclude_unset=True))
        self.session.add(obj)
        await self.session.commit()
        await self.session.refresh(obj)
        return obj

    async def update(self, id: int, data: ProductUpdate) -> Product | None:
        update_data = data.model_dump(exclude_unset=True)
        if update_data:
            await self.session.execute(update(Product).where(Product.id == id).values(**update_data))
            await self.session.commit()
        return await self.get(id)

    async def delete(self, id: int) -> Product | None:
        item = await self.session.get(Product, id)
        if not item:
            return None

        await self.session.delete(item)
        await self.session.commit()
        return item

    async def get_full(self, id: int) -> Product | None:
        result = await self.session.execute(
            select(Product)
            .options(
                joinedload(Product.brand),
                joinedload(Product.category),
                selectinload(Product.comments),
                selectinload(Product.items_in),
                selectinload(Product.items_out),
            )
            .where(Product.id == id)
        )
        return result.scalar_one_or_none()

    async def get_by_status(self, status: ProductStatus) -> list[Product]:
        result = await self.session.execute(select(Product).where(Product.status == status))
        return result.scalars().all()

    async def get_by_brand(self, brand_id: int) -> list[Product]:
        result = await self.session.execute(select(Product).where(Product.brand_id == brand_id))
        return result.scalars().all()

    async def get_by_category(self, category_id: int) -> list[Product]:
        result = await self.session.execute(select(Product).where(Product.category_id == category_id))
        return result.scalars().all()

    async def search(
        self,
        name: str | None = None,
        min_price: float | None = None,
        max_price: float | None = None,
        brand_id: int | None = None,
        category_id: int | None = None,
        status: ProductStatus | None = None,
        skip: int = 0,
        limit: int = 100,
    ) -> list[Product]:
        query = select(Product)
        if name:
            query = query.where(Product.name.ilike(f"%{name}%"))
        if min_price is not None:
            query = query.where(Product.price >= min_price)
        if max_price is not None:
            query = query.where(Product.price <= max_price)
        if brand_id is not None:
            query = query.where(Product.brand_id == brand_id)
        if category_id is not None:
            query = query.where(Product.category_id == category_id)
        if status is not None:
            query = query.where(Product.status == status)
        result = await self.session.execute(query.offset(skip).limit(limit))
        return result.scalars().all()

    async def update_stock(self, product_id: int, count: int) -> Product | None:
        await self.session.execute(update(Product).where(Product.id == product_id).values(count=count))
        await self.session.commit()
        return await self.get(product_id)
