from src.domain.exceptions.base import AppException


class InvalidTokenException(AppException):
    detail = "invalid token"
    status_code = 401


class TokenExpiredException(AppException):
    detail = "token is expired"
    status_code = 401
