from dishka import Provider, Scope, provide
from fastapi import Request, status
from fastapi.exceptions import HTTPException

from src.schemas.seller import SellerIdScheme


class SellerIdProvider(Provider):
    scope = Scope.REQUEST

    @provide
    async def get_user_id(self, request: Request) -> SellerIdScheme:
        seller_id = request.headers.get("X-User-Id")
        if seller_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="no X-User-Id header was provided",
            )
        return SellerIdScheme(seller_id=int(seller_id))
