from sqlalchemy.ext.asyncio import AsyncSession


class CategoryRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get_by_id(self):
        ...
