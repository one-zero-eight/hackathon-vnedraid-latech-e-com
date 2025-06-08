from fastapi import APIRouter, Depends, HTTPException, Query
from starlette import status

from src.db.repositories import RepositoryManager, get_repository_manager
from src.schemas import BrandCreate, BrandRead, BrandUpdate

brand_router = APIRouter(prefix="/brands", tags=["brands"])


@brand_router.get("/")
async def get_brands(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    repo_manager: RepositoryManager = Depends(get_repository_manager),
) -> list[BrandRead]:
    return await repo_manager.brand.get_all(skip=skip, limit=limit)


@brand_router.get("/{brand_id}")
async def get_brand(brand_id: int, repo_manager: RepositoryManager = Depends(get_repository_manager)) -> BrandRead:
    brand = await repo_manager.brand.get_by_id(brand_id)
    if not brand:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Brand not found")
    return brand


@brand_router.get("/name/{brand_name}")
async def get_brand_by_name(brand_name: str, repo_manager: RepositoryManager = Depends(get_repository_manager)) -> BrandRead:
    brand = await repo_manager.brand.get_by_name(brand_name)
    if not brand:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Brand not found")
    return brand


@brand_router.get("/{brand_id}/with-products")
async def get_brand_with_products(brand_id: int, repo_manager: RepositoryManager = Depends(get_repository_manager)) -> BrandRead:
    brand = await repo_manager.brand.get_with_products(brand_id)
    if not brand:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Brand not found")
    return brand


@brand_router.post("/", status_code=status.HTTP_201_CREATED)
async def create_brand(brand_data: BrandCreate, repo_manager: RepositoryManager = Depends(get_repository_manager)) -> BrandRead:
    return await repo_manager.brand.create(brand_data)


@brand_router.put("/{brand_id}")
async def update_brand(
    brand_id: int, brand_data: BrandUpdate, repo_manager: RepositoryManager = Depends(get_repository_manager)
) -> BrandRead:
    brand = await repo_manager.brand.update(brand_id, brand_data)
    if not brand:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Brand not found")
    return brand


@brand_router.delete("/{brand_id}")
async def delete_brand(brand_id: int, repo_manager: RepositoryManager = Depends(get_repository_manager)) -> BrandRead:
    brand = await repo_manager.brand.delete(brand_id)
    if not brand:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Brand not found")
    return brand
