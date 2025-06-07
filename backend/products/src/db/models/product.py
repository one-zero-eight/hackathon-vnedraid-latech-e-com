from decimal import Decimal
from enum import StrEnum
from typing import TYPE_CHECKING

from sqlalchemy import Column, ForeignKey, Numeric
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.db.__mixin__ import IdMixin
from src.db.models import Base

if TYPE_CHECKING:
    from src.db.models.brand import Brand
    from src.db.models.category import Category
    from src.db.models.comment import Comment
    from src.db.models.item import ItemIn, ItemOut


class ProductStatus(StrEnum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    UNDER_MODERATION = "under_moderation"


class Product(Base, IdMixin):
    __tablename__ = "product"

    name: Mapped[str] = mapped_column(nullable=False)
    price = Column(Numeric(10, 2), default=Decimal("0.00"))
    discount_price = Column(Numeric(10, 2), default=Decimal("0.00"))
    img_url: Mapped[str] = mapped_column(nullable=False)
    count: Mapped[int] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column(nullable=False)
    size_width: Mapped[int] = mapped_column(nullable=False)
    size_height: Mapped[int] = mapped_column(nullable=False)
    size_depth: Mapped[int] = mapped_column(nullable=False)
    lamoda_sku: Mapped[str] = mapped_column(nullable=False)
    status: Mapped[ProductStatus] = mapped_column(
        default=ProductStatus.INACTIVE, nullable=False
    )

    brand_id: Mapped[int] = mapped_column(
        ForeignKey("brand.id", ondelete="CASCADE"), nullable=False
    )
    category_id: Mapped[int] = mapped_column(
        ForeignKey("category.id", ondelete="CASCADE"), nullable=False
    )

    brand: Mapped["Brand"] = relationship(
        "Brand",
        foreign_keys=[brand_id],
        back_populates="products",
        lazy="joined",
        uselist=False,
    )
    category: Mapped["Category"] = relationship(
        "Category",
        foreign_keys=[category_id],
        back_populates="products",
        lazy="joined",
        uselist=False,
    )
    comments: Mapped[list["Comment"]] = relationship(
        "Comment",
        back_populates="product",
        cascade="all, delete-orphan",
        lazy="joined",
    )
    items_in: Mapped[list["ItemIn"]] = relationship(
        "ItemIn",
        back_populates="product",
        cascade="all, delete-orphan",
        lazy="joined",
    )
    items_out: Mapped[list["ItemOut"]] = relationship(
        "ItemOut",
        back_populates="product",
        cascade="all, delete-orphan",
        lazy="joined",
    )
