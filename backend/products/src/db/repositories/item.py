from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from src.db.models import ItemIn, ItemOut
from src.schemas import ItemInCreate, ItemInUpdate, ItemOutCreate, ItemOutUpdate


class ItemInRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_id(self, id: int) -> ItemIn | None:
        result = await self.session.execute(select(ItemIn).where(ItemIn.id == id))
        return result.unique().scalar_one_or_none()

    async def get_all(self) -> list[ItemIn]:
        result = await self.session.execute(select(ItemIn))
        return result.unique().scalars().all()

    async def create(self, data: ItemInCreate) -> ItemIn:
        obj = ItemIn(**data.model_dump())
        self.session.add(obj)
        await self.session.commit()
        await self.session.refresh(obj)
        return obj

    async def update(self, id: int, data: ItemInUpdate) -> ItemIn:
        update_data = data.model_dump(exclude_unset=True)
        if update_data:
            await self.session.execute(update(ItemIn).where(ItemIn.id == id).values(**update_data))
            await self.session.commit()

        return await self.get_by_id(id)

    async def delete(self, id: int) -> ItemIn | None:
        item = await self.session.get(ItemIn, id)
        if not item:
            return None

        await self.session.delete(item)
        await self.session.commit()
        return item


class ItemOutRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_id(self, id: int) -> ItemOut | None:
        result = await self.session.execute(select(ItemOut).where(ItemOut.id == id))
        return result.unique().scalar_one_or_none()

    async def get_all(self) -> list[ItemOut]:
        result = await self.session.execute(select(ItemOut))
        return result.unique().scalars().all()

    async def create(self, data: ItemOutCreate) -> ItemOut:
        obj = ItemOut(**data.model_dump())
        self.session.add(obj)
        await self.session.commit()
        await self.session.refresh(obj)
        return obj

    async def update(self, id: int, data: ItemOutUpdate) -> ItemOut:
        update_data = data.model_dump(exclude_unset=True)
        if update_data:
            await self.session.execute(update(ItemOut).where(ItemOut.id == id).values(**update_data))
            await self.session.commit()

        return await self.get_by_id(id)

    async def delete(self, id: int) -> ItemOut | None:
        item = await self.session.get(ItemOut, id)
        if not item:
            return None

        await self.session.delete(item)
        await self.session.commit()
        return item
