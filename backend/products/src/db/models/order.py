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
    sold_datetime: Mapped[datetime.datetime] = mapped_column(
        default=lambda: datetime.datetime.now(datetime.UTC), nullable=False
    )

    order_items: Mapped[list["ItemOut"]] = relationship(
        "OrderItem",
        back_populates="order",
        cascade="all, delete-orphan",
        lazy="joined",
    )
