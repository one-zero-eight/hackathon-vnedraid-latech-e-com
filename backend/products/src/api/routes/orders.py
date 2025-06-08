from fastapi import APIRouter, Depends, HTTPException
from starlette import status

from src.db.repositories import RepositoryManager, get_repository_manager
from src.schemas import OrderCreate, OrderRead, OrderUpdate

order_router = APIRouter(prefix="/orders", tags=["orders"])


@order_router.get("/", response_model=list[OrderRead])
async def get_orders(repo_manager: RepositoryManager = Depends(get_repository_manager)):
    return await repo_manager.order.get_all()


@order_router.get("/{order_id}", response_model=OrderRead)
async def get_order(order_id: int, repo_manager: RepositoryManager = Depends(get_repository_manager)):
    order = await repo_manager.order.get_by_id(order_id)
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return order


@order_router.post("/", response_model=OrderRead, status_code=status.HTTP_201_CREATED)
async def create_order(order_data: OrderCreate, repo_manager: RepositoryManager = Depends(get_repository_manager)):
    return await repo_manager.order.create(order_data)


@order_router.patch("/{order_id}", response_model=OrderRead)
async def update_order(
    order_id: int, order_data: OrderUpdate, repo_manager: RepositoryManager = Depends(get_repository_manager)
):
    order = await repo_manager.order.update(order_id, order_data)
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return order


@order_router.delete("/{order_id}", response_model=OrderRead)
async def delete_order(order_id: int, repo_manager: RepositoryManager = Depends(get_repository_manager)):
    order = await repo_manager.order.delete(order_id)
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return order
