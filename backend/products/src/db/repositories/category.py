from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from src.db.models import Category
from src.schemas import CategoryCreate, CategoryUpdate


class CategoryRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get_by_id(self, id: int) -> Category | None:
        result = await self.session.execute(select(Category).where(Category.id == id))
        return result.scalar_one_or_none()

    async def get_by_name(self, name: str) -> Category | None:
        result = await self.session.execute(select(Category).where(Category.name == name))
        return result.scalar_one_or_none()

    async def get_all(self, skip: int = 0, limit: int = 100) -> list[Category]:
        result = await self.session.execute(
            select(Category).offset(skip).limit(limit)
        )
        return result.scalars().all()

    async def create(self, data: CategoryCreate) -> Category:
        obj = Category(**data.model_dump())
        self.session.add(obj)
        await self.session.commit()
        await self.session.refresh(obj)
        return obj

    async def update(self, id: int, data: CategoryUpdate) -> Category | None:
        update_data = data.model_dump(exclude_unset=True)
        if update_data:
            await self.session.execute(update(Category).where(Category.id == id).values(**update_data))
            await self.session.commit()

        return await self.get_by_id(id)

    async def delete(self, id: int) -> Category | None:
        category = await self.session.get(Category, id)
        if not category:
            return None

        await self.session.delete(category)
        await self.session.commit()
        return category
