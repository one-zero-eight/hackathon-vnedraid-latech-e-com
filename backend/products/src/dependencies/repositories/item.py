from dishka import Provider, Scope, provide
from sqlalchemy.ext.asyncio import AsyncSession

from src.repositories.item import ItemRepository


class ItemRepositoryProvider(Provider):
    scope = Scope.REQUEST

    @provide
    async def get_item_repository(self, session: AsyncSession) -> ItemRepository:
        return ItemRepository(session)
