from fastapi import APIRouter, Depends, HTTPException
from starlette import status

from src.db.repositories import RepositoryManager, get_repository_manager
from src.schemas import ItemInCreate, ItemInRead, ItemInUpdate, ItemOutCreate, ItemOutRead, ItemOutUpdate

item_in_router = APIRouter(prefix="/items-in", tags=["items-in"])


@item_in_router.get("/", response_model=list[ItemInRead])
async def get_items_in(repo_manager: RepositoryManager = Depends(get_repository_manager)):
    return await repo_manager.item_in.get_all()


@item_in_router.get("/{item_id}", response_model=ItemInRead)
async def get_item_in(item_id: int, repo_manager: RepositoryManager = Depends(get_repository_manager)):
    item = await repo_manager.item_in.get_by_id(item_id)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    return item


@item_in_router.post("/", response_model=ItemInRead, status_code=status.HTTP_201_CREATED)
async def create_item_in(item_data: ItemInCreate, repo_manager: RepositoryManager = Depends(get_repository_manager)):
    return await repo_manager.item_in.create(item_data)


@item_in_router.patch("/{item_id}", response_model=ItemInRead)
async def update_item_in(
    item_id: int, item_data: ItemInUpdate, repo_manager: RepositoryManager = Depends(get_repository_manager)
):
    item = await repo_manager.item_in.update(item_id, item_data)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    return item


@item_in_router.delete("/{item_id}", response_model=ItemInRead)
async def delete_item_in(item_id: int, repo_manager: RepositoryManager = Depends(get_repository_manager)):
    item = await repo_manager.item_in.delete(item_id)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    return item


item_out_router = APIRouter(prefix="/items-out", tags=["items-out"])


@item_out_router.get("/", response_model=list[ItemOutRead])
async def get_items_out(repo_manager: RepositoryManager = Depends(get_repository_manager)):
    return await repo_manager.item_out.get_all()


@item_out_router.get("/{item_id}", response_model=ItemOutRead)
async def get_item_out(item_id: int, repo_manager: RepositoryManager = Depends(get_repository_manager)):
    item = await repo_manager.item_out.get_by_id(item_id)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    return item


@item_out_router.post("/", response_model=ItemOutRead, status_code=status.HTTP_201_CREATED)
async def create_item_out(item_data: ItemOutCreate, repo_manager: RepositoryManager = Depends(get_repository_manager)):
    return await repo_manager.item_out.create(item_data)


@item_out_router.patch("/{item_id}", response_model=ItemOutRead)
async def update_item_out(
    item_id: int, item_data: ItemOutUpdate, repo_manager: RepositoryManager = Depends(get_repository_manager)
):
    item = await repo_manager.item_out.update(item_id, item_data)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    return item


@item_out_router.delete("/{item_id}", response_model=ItemOutRead)
async def delete_item_out(item_id: int, repo_manager: RepositoryManager = Depends(get_repository_manager)):
    item = await repo_manager.item_out.delete(item_id)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    return item
