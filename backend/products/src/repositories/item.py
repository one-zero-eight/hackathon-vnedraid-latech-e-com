from datetime import date, timedelta
from decimal import Decimal

from sqlalchemy import func, select, text
from sqlalchemy.ext.asyncio import AsyncSession

from src.db.models import Brand, ItemOut, Order, Product, Category
from src.db.models.order import OrderStatus


class ItemRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get_total_for_current_and_previos_number_of_days(
        self, days: int, seller_id: int
    ) -> tuple[Decimal, Decimal]:
        start = date.today() - timedelta(days=days - 1)
        start_prev = start - timedelta(days)
        query = (
            select(
                func.sum(Product.price * ItemOut.count)
                .filter(Order.sold_datetime >= start)
                .label("current"),
                func.sum(Product.price * ItemOut.count)
                .filter(
                    Order.sold_datetime >= start_prev,
                    Order.sold_datetime < start,
                )
                .label("previous"),
            )
            .select_from(ItemOut)
            .join(Product, Product.id == ItemOut.product_id)
            .join(Order, Order.id == ItemOut.order_id)
            .join(Brand, Brand.id == Product.brand_id)
            .where(
                Order.sold_datetime != None,
                Brand.seller_id == seller_id,
                Order.status == OrderStatus.COMPLETED,
            )
        )
        result = await self.session.execute(query)
        result = result.first()
        if result:
            return (
                result.previous if result.previous else 0,
                result.current if result.current else 0
            )
        return 0, 0

    async def get_average_for_current_and_previos_number_of_days(
        self, days: int, seller_id: int
    ) -> tuple[Decimal, Decimal]:
        start = date.today() - timedelta(days=days - 1)
        start_prev = start - timedelta(days)
        order_totals = (
            select(
                func.sum(ItemOut.count * Product.price).label("order_total"),
            )
            .select_from(ItemOut)
            .join(Product, Product.id == ItemOut.product_id)
            .join(Order, ItemOut.order_id == Order.id)
            .join(Brand, Brand.id == Product.brand_id)
            .where(
                Order.sold_datetime != None,
                Brand.seller_id == seller_id,
                Order.status == OrderStatus.COMPLETED,
            )
            .group_by(Order.id)
        ).subquery()

        current_stmt = select(
            func.avg(order_totals.c.order_total).label("avg_cost"),
        ).where(
            order_totals.c.sold_datetime >= start,
        )

        previous_stmt = select(
            func.avg(order_totals.c.order_total).label("avg_cost"),
        ).where(
            order_totals.c.sold_datetime >= start_prev,
            order_totals.c.sold_datetime < start,
        )

        current_result = await self.session.execute(current_stmt)
        current_result = current_result.first()
        previous_result = await self.session.execute(previous_stmt)
        previous_result = previous_result.first()
        return (
            previous_result if previous_result else 0,
            previous_result if previous_result else 0,
        )

    async def get_total_bought_products_for_current_and_previos_number_of_days(
        self, days: int, seller_id: int
    ) -> tuple[int, int]:
        start = date.today() - timedelta(days=days - 1)
        start_prev = start - timedelta(days)
        query = (
            select(
                func.sum(ItemOut.count)
                .filter(Order.sold_datetime >= start)
                .label("current"),
                func.sum(ItemOut.count)
                .filter(
                    Order.sold_datetime >= start_prev,
                    Order.sold_datetime < start,
                )
                .label("previous"),
            )
            .select_from(ItemOut)
            .join(Product, Product.id == ItemOut.product_id)
            .join(Order, Order.id == ItemOut.order_id)
            .join(Brand, Brand.id == Product.brand_id)
            .where(
                Order.sold_datetime != None,
                Brand.seller_id == seller_id,
                Order.status == OrderStatus.COMPLETED,
            )
        )
        result = await self.session.execute(query)
        result = result.first()
        if result:
            return (
                result.previous if result.previous else 0,
                result.current if result.current else 0
            )
        return 0, 0

    async def get_categories_with_number_of_bought_items(self, days: int, seller_id: int) -> dict[str, int]:
        start = date.today() - timedelta(days=days - 1)
        query = select(
            Category.name, func.sum(ItemOut.count)
        ).select_from(
            ItemOut
        ).join(
            Product, Product.id == ItemOut.product_id
        ).join(Brand, Brand.id == Product.brand_id
        ).join(Category, Product.category_id == Category.id
               ).join(
                   Order, Order.id == ItemOut.order_id
               ).where(
            Order.sold_datetime != None,
            Brand.seller_id == seller_id,
            Order.status == OrderStatus.COMPLETED,
            Order.sold_datetime >= start,
        ).group_by(Category.id)
        results = await self.session.execute(query)
        results = results.fetchall()
        return {
            item[0]: item[1]
            for item in results
        }
