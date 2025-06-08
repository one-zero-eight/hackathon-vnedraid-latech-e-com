import csv
import io

from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File
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
    category_id: int | None = Query(None, ge=1),
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


@product_router.patch("/", response_model=ProductRead)
async def update_product(
    product_data: ProductUpdate, repo_manager: RepositoryManager = Depends(get_repository_manager)
):
    product = await repo_manager.product.update(product_data)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product


@product_router.patch("/batch", response_model=list[ProductRead])
async def update_product_batch(
    products_data: list[ProductUpdate], repo_manager: RepositoryManager = Depends(get_repository_manager)
):
    result = []
    for product in products_data:
        product = await repo_manager.product.update(product)
        if not product:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
        result.append(product)
    return result


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
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product


@product_router.post("/upload/csv", response_model=list[ProductRead], status_code=status.HTTP_201_CREATED)
async def upload_csv(
    file: UploadFile = File(...),
    repo_manager: RepositoryManager = Depends(get_repository_manager),
):
    if file.content_type != "text/csv":
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="File is not CSV",
        )

    content = await file.read()
    try:
        text = content.decode("utf-8")
    except UnicodeDecodeError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="CSV must be UTF-8 encoded.",
        )

    reader = csv.DictReader(io.StringIO(text))
    to_create: list[ProductCreate] = []
    errors = []

    for idx, row in enumerate(reader, start=1):
        try:
            row["price"] = float(row["price"])
            row["discount_price"] = float(row["discount_price"])
            row["count"] = int(row["count"])
            row["size_width"] = int(row["size_width"])
            row["size_height"] = int(row["size_height"])
            row["size_depth"] = int(row["size_depth"])
            row["brand_id"] = int(row["brand_id"])
            row["category_id"] = int(row["category_id"])
            row["status"] = ProductStatus[row["status"].upper()]

            pc = ProductCreate(**row)
            to_create.append(pc)

        except Exception as e:
            errors.append({"row": idx, "error": str(e)})

    if errors:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail={"errors": errors},
        )

    created_products = []
    for product_data in to_create:
        created = await repo_manager.product.create(product_data)
        created_products.append(created)

    return created_products
