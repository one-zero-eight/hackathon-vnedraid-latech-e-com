from fastapi import APIRouter, Depends, HTTPException, Query
from starlette import status

from src.db.models import ProductStatus
from src.db.repositories import RepositoryManager, get_repository_manager
from src.schemas import ProductCreate, ProductRead, ProductUpdate

product_router = APIRouter(prefix="/products", tags=["products"])


@product_router.get("/", response_model=list[ProductRead])
async def get_products(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    repo_manager: RepositoryManager = Depends(get_repository_manager),
):
    return await repo_manager.product.get_all(skip=skip, limit=limit)


@product_router.get("/search", response_model=list[ProductRead])
async def search_products(
    name: str | None = Query(None),
    min_price: float | None = Query(None, ge=0),
    max_price: float | None = Query(None, ge=0),
    brand_id: int | None = Query(None, ge=1),
    category_id: int | None = Query(None, ge=1),  # noqa: UP007
    status: ProductStatus | None = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    repo_manager: RepositoryManager = Depends(get_repository_manager),
):
    return await repo_manager.product.search(
        name=name,
        min_price=min_price,
        max_price=max_price,
        brand_id=brand_id,
        category_id=category_id,
        status=status,
        skip=skip,
        limit=limit,
    )


@product_router.get("/{product_id}", response_model=ProductRead)
async def get_product(product_id: int, repo_manager: RepositoryManager = Depends(get_repository_manager)):
    product = await repo_manager.product.get(product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product


@product_router.get("/{product_id}/full", response_model=ProductRead)
async def get_product_full(product_id: int, repo_manager: RepositoryManager = Depends(get_repository_manager)):
    product = await repo_manager.product.get_full(product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product


@product_router.get("/status/{product_status}", response_model=list[ProductRead])
async def get_products_by_status(
    product_status: ProductStatus, repo_manager: RepositoryManager = Depends(get_repository_manager)
):
    return await repo_manager.product.get_by_status(product_status)


@product_router.get("/brand/{brand_id}", response_model=list[ProductRead])
async def get_products_by_brand(brand_id: int, repo_manager: RepositoryManager = Depends(get_repository_manager)):
    return await repo_manager.product.get_by_brand(brand_id)


@product_router.get("/category/{category_id}", response_model=list[ProductRead])
async def get_products_by_category(category_id: int, repo_manager: RepositoryManager = Depends(get_repository_manager)):
    return await repo_manager.product.get_by_category(category_id)


@product_router.post("/", response_model=ProductRead, status_code=status.HTTP_201_CREATED)
async def create_product(
    product_data: ProductCreate, repo_manager: RepositoryManager = Depends(get_repository_manager)
):
    return await repo_manager.product.create(product_data)


@product_router.patch("/{product_id}", response_model=ProductRead)
async def update_product(
    product_id: int, product_data: ProductUpdate, repo_manager: RepositoryManager = Depends(get_repository_manager)
):
    product = await repo_manager.product.update(product_id, product_data)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product


@product_router.patch("/{product_id}/stock", response_model=ProductRead)
async def update_product_stock(
    product_id: int, count: int, repo_manager: RepositoryManager = Depends(get_repository_manager)
):
    product = await repo_manager.product.update_stock(product_id, count)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product


@product_router.delete("/{product_id}", response_model=ProductRead)
async def delete_product(product_id: int, repo_manager: RepositoryManager = Depends(get_repository_manager)):
    product = await repo_manager.product.delete(product_id)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    return product
