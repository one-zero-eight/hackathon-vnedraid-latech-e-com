from typing import TYPE_CHECKING

from sqlalchemy import Column, ForeignKey, String
from sqlalchemy.orm import Mapped, relationship

from src.db.__mixin__ import IdMixin
from src.db.models import Base

if TYPE_CHECKING:
    from src.db.models.product import Product


class Comment(Base, IdMixin):
    __tablename__ = "comment"

    content: Mapped[str] = Column(String(50))
    product_id: Mapped[int] = Column(ForeignKey("product.id"))

    product: Mapped["Product"] = relationship(
        "Product",
        foreign_keys=[product_id],
        back_populates="comments",
        lazy="joined",
        uselist=False,
    )
