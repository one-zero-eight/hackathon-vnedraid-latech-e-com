from dishka import Provider, Scope, provide
from sqlalchemy.ext.asyncio import AsyncSession
from src.repositories.category import CategoryRepository


class CategoryRepositoryProvider(Provider):
    scope = Scope.REQUEST

    @provide
    async def get_category_repository(self, session: AsyncSession) -> CategoryRepository:
        return CategoryRepository(session)
