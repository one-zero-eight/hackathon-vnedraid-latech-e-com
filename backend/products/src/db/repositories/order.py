from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from src.db.models import Order
from src.schemas import OrderCreate, OrderUpdate


class OrderRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_id(self, id: int) -> Order | None:
        result = await self.session.execute(select(Order).where(Order.id == id))
        return result.scalar_one_or_none()

    async def get_all(self) -> list[Order]:
        result = await self.session.execute(select(Order))
        return result.scalars().all()

    async def create(self, data: OrderCreate) -> Order:
        obj = Order(**data.model_dump())
        self.session.add(obj)
        await self.session.commit()
        await self.session.refresh(obj)
        return obj

    async def update(self, id: int, data: OrderUpdate) -> Order:
        update_data = data.model_dump(exclude_unset=True)
        if update_data:
            await self.session.execute(update(Order).where(Order.id == id).values(**update_data))
            await self.session.commit()

        return await self.get_by_id(id)

    async def delete(self, id: int) -> Order | None:
        order = await self.session.get(Order, id)
        if not order:
            return None

        await self.session.delete(order)
        await self.session.commit()
        return order
