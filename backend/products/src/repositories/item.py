from datetime import date, timedelta
from decimal import Decimal

from sqlalchemy import func, select, text
from sqlalchemy.ext.asyncio import AsyncSession

from src.db.models import Brand, ItemOut, Order, Product


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
                .filter(Order.sold_datetime != None, Order.sold_datetime >= start)
                .label("current"),
                func.sum(Product.price * ItemOut.count)
                .filter(
                    Order.sold_datetime != None,
                    Order.sold_datetime >= start_prev,
                    Order.sold_datetime < start,
                    Brand.seller_id == seller_id,
                )
                .label("previous"),
            )
            .select_from(ItemOut)
            .join(Product, Product.id == ItemOut.product_id)
            .join(Order, Order.id == ItemOut.order_id)
            .join(Brand, Brand.id == Product.brand_id)
        )
        result = await self.session.execute(query)
        result = result.scalar_one()
        if result:
            return result.previous, result.current
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
            .filter(Order.sold_datetime != None, Brand.seller_id == seller_id)
            .select_from(ItemOut)
            .join(Product, Product.id == ItemOut.product_id)
            .join(Order, ItemOut.order_id == Order.id)
            .join(Brand, Brand.id == Product.brand_id)
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
        current_result = current_result.scalar_one()
        previous_result = await self.session.execute(previous_stmt)
        previous_result = previous_result.scalar_one()
        return previous_result, current_result
