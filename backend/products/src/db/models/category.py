from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.db.__mixin__ import IdMixin
from src.db.models import Base

if TYPE_CHECKING:
    from db.models.product import Product


class Category(Base, IdMixin):
    __tablename__ = "category"

    name: Mapped[str] = mapped_column(String(50))

    products: Mapped[list["Product"]] = relationship(
        "Product",
        back_populates="category",
        cascade="all, delete-orphan",
        lazy="joined",
    )
