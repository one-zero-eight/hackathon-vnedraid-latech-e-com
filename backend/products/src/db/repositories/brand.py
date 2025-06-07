from sqlalchemy import delete, select, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from src.db.models import Brand
from src.schemas import BrandCreate, BrandRead, BrandUpdate


class BrandRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get_by_id(self, id: int) -> Brand | None:
        result = await self.session.execute(
            select(Brand).where(Brand.id == id)
        )
        return result.scalar_one_or_none()

    async def get_all(self, skip: int = 0, limit: int = 100) -> list[Brand]:
        result = await self.session.execute(
            select(Brand).offset(skip).limit(limit)
        )
        return result.scalars().all()

    async def create(self, data: BrandCreate) -> Brand:
        obj = Brand(**data.model_dump())
        self.session.add(obj)
        await self.session.commit()
        await self.session.refresh(obj)
        return obj

    async def update(self, id: int, data: BrandUpdate) -> Brand | None:
        update_data = data.model_dump(exclude_unset=True)
        if update_data:
            await self.session.execute(
                update(Brand).where(Brand.id == id).values(**update_data)
            )
            await self.session.commit()
        return await self.get_by_id(id)

    async def delete(self, id: int) -> Brand | None:
        item = await self.session.get(Brand, id)
        if not item:
            return None

        await self.session.delete(item)
        await self.session.commit()
        return item

    async def get_by_name(self, name: str) -> Brand | None:
        result = await self.session.execute(
            select(Brand).where(Brand.name == name)
        )
        return result.scalar_one_or_none()

    async def get_with_products(self, id: int) -> Brand | None:
        result = await self.session.execute(
            select(Brand)
            .options(joinedload(Brand.products))
            .where(Brand.id == id)
        )
        return result.scalar_one_or_none()
