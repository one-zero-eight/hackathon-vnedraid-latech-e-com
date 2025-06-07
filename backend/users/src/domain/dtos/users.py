import datetime
import re
from typing import ClassVar

from pydantic import BaseModel, EmailStr, field_validator

from src.domain.dtos.password import PasswordDTO
import phonenumbers
from phonenumbers.phonenumberutil import NumberParseException


class UserBaseDTO(BaseModel):
    username: str
    email: EmailStr
    name: str
    inn: str
    card_number: str
    bank_code: str
    phone_number: str
    bank_name: str


class UserCreateDTO(UserBaseDTO, PasswordDTO):
    USERNAME_PATTERN: ClassVar = re.compile(r"^[a-zA-Z0-9_]+$")

    @field_validator("username")
    @classmethod
    def validate_username(cls, value: str) -> str:
        if not 5 <= len(value) <= 30:
            raise ValueError(
                "username must be 5 to 30 symbols length",
            )
        if not cls.USERNAME_PATTERN.match(value):
            raise ValueError(
                "username must consist only of english "
                "letters, digits and _ sign",
            )
        return value

    @field_validator("inn")
    @classmethod
    def validate_inn(cls, value: str) -> str:
        if len(value) not in (10, 12):
            raise ValueError(
                "inn must be a string of 10 or 12 digits"
            )
        if not value.isnumeric():
            raise ValueError(
                "inn must consist only of digits"
            )
        return value

    @field_validator("card_number")
    @classmethod
    def validate_card_number(cls, value: str) -> str:
        if len(value) != 20:
            raise ValueError(
                "card number must be a string of 20 digits"
            )
        if not value.isnumeric():
            raise ValueError(
                "card number must consist only of digits"
            )
        return value

    @field_validator("bank_code")
    @classmethod
    def validate_bank_code(cls, value: str) -> str:
        if len(value) != 9:
            raise ValueError(
                "bank code must be a string of 9 digits"
            )
        if not value.isnumeric():
            raise ValueError(
                "bank code must consist only of digits"
            )
        return value

    @field_validator("phone_number")
    @classmethod
    def validate_phone_number(cls, value: str) -> str:
        try:
            value = phonenumbers.parse(value, "RU")
            if phonenumbers.is_valid_number(value):
                return str(value.country_code) + str(value.national_number)
            raise NumberParseException
        except NumberParseException as e:
            raise ValueError("phone number is not valid") from e 


class UserReadDTO(UserBaseDTO):
    id: int
    is_active: bool


class UserDTO(UserReadDTO):
    hashed_password: str
    password_updated_at: datetime.datetime


class UserLoginDTO(BaseModel):
    login: str
    password: str
