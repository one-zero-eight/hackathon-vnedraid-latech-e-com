from pydantic import BaseModel


class SellerIdScheme(BaseModel):
    seller_id: int
