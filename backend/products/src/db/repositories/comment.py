from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from src.db.models import Comment
from src.schemas import CommentCreate, CommentUpdate


class CommentRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_id(self, id: int) -> Comment | None:
        result = await self.session.execute(select(Comment).where(Comment.id == id))
        return result.unique().scalar_one_or_none()

    async def get_all(self) -> list[Comment]:
        result = await self.session.execute(select(Comment))
        return result.unique().scalars().all()

    async def create(self, data: CommentCreate) -> Comment:
        obj = Comment(**data.model_dump())
        self.session.add(obj)
        await self.session.commit()
        await self.session.refresh(obj)
        return obj

    async def update(self, id: int, data: CommentUpdate) -> Comment:
        update_data = data.model_dump(exclude_unset=True)
        if update_data:
            await self.session.execute(update(Comment).where(Comment.id == id).values(**update_data))
            await self.session.commit()

        return await self.get_by_id(id)

    async def delete(self, id: int) -> Comment | None:
        comment = await self.session.get(Comment, id)
        if not comment:
            return None

        await self.session.delete(comment)
        await self.session.commit()
        return comment
