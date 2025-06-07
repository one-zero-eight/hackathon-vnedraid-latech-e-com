from pydantic import BaseModel, ConfigDict


class CommentRead(BaseModel):
    id: int
    content: str
    product_id: int

    model_config = ConfigDict(from_attributes=True)


class CommentCreate(BaseModel):
    content: str
    product_id: int


class CommentUpdate(BaseModel):
    content: str | None = None
