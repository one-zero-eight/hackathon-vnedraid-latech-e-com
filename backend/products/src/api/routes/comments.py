from fastapi import APIRouter, Depends, HTTPException
from starlette import status

from src.db.repositories import RepositoryManager, get_repository_manager
from src.schemas import CommentCreate, CommentRead, CommentUpdate

comment_router = APIRouter(prefix="/comments", tags=["comments"])

@comment_router.get("/", response_model=list[CommentRead])
async def get_comments(
    repo_manager: RepositoryManager = Depends(get_repository_manager)
):
    return await repo_manager.comment.get_all()

@comment_router.get("/{comment_id}", response_model=CommentRead)
async def get_comment(
    comment_id: int,
    repo_manager: RepositoryManager = Depends(get_repository_manager)
):
    comment = await repo_manager.comment.get_by_id(comment_id)
    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found"
        )
    return comment

@comment_router.post("/", response_model=CommentRead, status_code=status.HTTP_201_CREATED)
async def create_comment(
    comment_data: CommentCreate,
    repo_manager: RepositoryManager = Depends(get_repository_manager)
):
    return await repo_manager.comment.create(comment_data)

@comment_router.put("/{comment_id}", response_model=CommentRead)
async def update_comment(
    comment_id: int,
    comment_data: CommentUpdate,
    repo_manager: RepositoryManager = Depends(get_repository_manager)
):
    comment = await repo_manager.comment.update(comment_id, comment_data)
    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found"
        )
    return comment

@comment_router.delete("/{comment_id}", response_model=CommentRead)
async def delete_comment(
    comment_id: int,
    repo_manager: RepositoryManager = Depends(get_repository_manager)
):
    comment = await repo_manager.comment.delete(comment_id)
    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found"
        )
    return comment
