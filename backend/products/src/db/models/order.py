import datetime
from enum import StrEnum
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.db.__mixin__ import IdMixin
from src.db.models import Base

if TYPE_CHECKING:
    from src.db.models.item import ItemOut


class OrderStatus(StrEnum):
    PENDING = "pending"
    COMPLETED = "completed"
    SHIPPED = "shipped"


class Order(Base, IdMixin):
    __tablename__ = "order"

    status: Mapped[OrderStatus] = mapped_column(
        nullable=False, default=OrderStatus.PENDING
    )

    order_items: Mapped[list["OrderItem"]] = relationship(
        "OrderItem",
        back_populates="order",
        cascade="all, delete-orphan",
        lazy="joined",
    )



class OrderItem(Base, IdMixin):
    __tablename__ = "order_item"

    item_out_id: Mapped[int] = mapped_column(ForeignKey("item_out.id", ondelete="CASCADE"))
    order_id: Mapped[int] = mapped_column(ForeignKey("order.id", ondelete="CASCADE"))
    sold_datetime: Mapped[datetime.datetime] = mapped_column(
        default=lambda: datetime.datetime.now(datetime.timezone.utc), nullable=False
    )

    item_out: Mapped["ItemOut"] = relationship(
        "ItemOut",
        foreign_keys=[item_out_id],
        lazy="joined",
        uselist=False,
    )

    order: Mapped["Order"] = relationship(
        "Order",
        foreign_keys=[order_id],
        back_populates="order_items",
        lazy="joined",
        uselist=False,
    )
