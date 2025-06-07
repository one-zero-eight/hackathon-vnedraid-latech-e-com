from typing import TYPE_CHECKING

from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.db.__mixin__ import IdMixin
from src.db.models import Base

if TYPE_CHECKING:
    from src.db.models.product import Product


class Brand(Base, IdMixin):
    __tablename__ = 'brand'

    name: Mapped[str] = mapped_column(nullable=False)
    seller_id: Mapped[int] = mapped_column(nullable=False)

    products: Mapped[list["Product"]] = relationship(
        "Product",
        back_populates="brand",
        cascade="all, delete-orphan",
        lazy="joined",
    )
