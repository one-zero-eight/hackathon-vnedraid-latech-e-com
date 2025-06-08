from fastapi import APIRouter, Depends, HTTPException
from starlette import status

from src.db.repositories import RepositoryManager, get_repository_manager
from src.schemas import CategoryCreate, CategoryRead, CategoryUpdate

category_router = APIRouter(prefix="/categories", tags=["categories"])

@category_router.get("/", response_model=list[CategoryRead])
async def get_categories(
    repo_manager: RepositoryManager = Depends(get_repository_manager)
):
    return await repo_manager.category.get_all()

@category_router.get("/{category_id}", response_model=CategoryRead)
async def get_category(
    category_id: int,
    repo_manager: RepositoryManager = Depends(get_repository_manager)
):
    category = await repo_manager.category.get_by_id(category_id)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )
    return category

@category_router.get("/name/{category_name}", response_model=CategoryRead)
async def get_category_by_name(
    category_name: str,
    repo_manager: RepositoryManager = Depends(get_repository_manager)
):
    category = await repo_manager.category.get_by_name(category_name)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )
    return category

@category_router.post("/", response_model=CategoryRead, status_code=status.HTTP_201_CREATED)
async def create_category(
    category_data: CategoryCreate,
    repo_manager: RepositoryManager = Depends(get_repository_manager)
):
    return await repo_manager.category.create(category_data)

@category_router.put("/{category_id}", response_model=CategoryRead)
async def update_category(
    category_id: int,
    category_data: CategoryUpdate,
    repo_manager: RepositoryManager = Depends(get_repository_manager)
):
    category = await repo_manager.category.update(category_id, category_data)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )
    return category

@category_router.delete("/{category_id}", response_model=CategoryRead)
async def delete_category(
    category_id: int,
    repo_manager: RepositoryManager = Depends(get_repository_manager)
):
    category = await repo_manager.category.delete(category_id)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )
    return category
