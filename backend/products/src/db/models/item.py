import datetime
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.db.__mixin__ import IdMixin
from src.db.models import Base

if TYPE_CHECKING:
    from src.db.models.order import OrderItem
    from src.db.models.product import Product


class ItemIn(Base, IdMixin):
    __tablename__ = "item_in"

    product_id: Mapped[int] = mapped_column(ForeignKey("product.id"), nullable=False)
    count: Mapped[int] = mapped_column(nullable=False)
    added: Mapped[datetime.datetime] = mapped_column(
        default=lambda: datetime.datetime.now(datetime.timezone.utc), nullable=False
    )

    product: Mapped["Product"] = relationship(
        "Product",
        foreign_keys=[product_id],
        back_populates="items_in",
        lazy="joined",
        uselist=False,
    )


class ItemOut(Base, IdMixin):
    __tablename__ = "item_out"

    product_id: Mapped[int] = mapped_column(ForeignKey("product.id"), nullable=False)

    product: Mapped["Product"] = relationship(
        "Product",
        foreign_keys=[product_id],
        back_populates="items_out",
        lazy="joined",
        uselist=False,
    )

    order_items: Mapped[list["OrderItem"]] = relationship(
        "OrderItem",
        back_populates="item_out",
        cascade="all, delete-orphan",
        lazy="joined",
    )
