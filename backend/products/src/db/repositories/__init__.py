from fastapi.params import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.db.repositories.brand import BrandRepository
from src.db.repositories.category import CategoryRepository
from src.db.repositories.comment import CommentRepository
from src.db.repositories.item import ItemInRepository, ItemOutRepository
from src.db.repositories.order import OrderRepository
from src.db.repositories.product import ProductRepository
from src.dependencies.db import get_session

class RepositoryManager:
    def __init__(self, session: AsyncSession):
        self.session = session
        self.brand = BrandRepository(session)
        self.category = CategoryRepository(session)
        self.product = ProductRepository(session)
        self.order = OrderRepository(session)
        self.comment = CommentRepository(session)
        self.item_in = ItemInRepository(session)
        self.item_out = ItemOutRepository(session)

    async def commit(self):
        await self.session.commit()

    async def rollback(self):
        await self.session.rollback()


async def get_repository_manager(
    session: AsyncSession = Depends(get_session)
) -> RepositoryManager:
    return RepositoryManager(session)
