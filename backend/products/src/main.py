from dishka.integrations.fastapi import setup_dishka
from fastapi import FastAPI, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.openapi.utils import get_openapi
from fastapi.responses import JSONResponse

from src.dependencies import create_async_container


def get_openapi_schema(app: FastAPI):
    if not app.openapi_schema:
        app.openapi_schema = get_openapi(
            title=app.title,
            version=app.version,
            openapi_version=app.openapi_version,
            description=app.description,
            terms_of_service=app.terms_of_service,
            contact=app.contact,
            license_info=app.license_info,
            routes=app.routes,
            tags=app.openapi_tags,
            servers=app.servers,
        )
        for _, method_item in app.openapi_schema.get("paths").items():
            for _, param in method_item.items():
                responses = param.get("responses")
                if "422" in responses:
                    del responses["422"]
    return app.openapi_schema


async def validation_exception_handler(
    request: Request, exc: RequestValidationError
) -> JSONResponse:
    content = {}
    for item in exc.errors():
        content[item["loc"][1]] = item["msg"]
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content=jsonable_encoder(content),
    )


def create_app() -> FastAPI:
    app = FastAPI(root_path="/api/v1")
    app.openapi_schema = get_openapi_schema(app)
    container = create_async_container()
    setup_dishka(container, app)
    app.exception_handler(RequestValidationError)(validation_exception_handler)
    return app


app = create_app()
