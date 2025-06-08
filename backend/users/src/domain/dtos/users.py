import datetime
import re
from typing import ClassVar

import phonenumbers
from phonenumbers.phonenumberutil import NumberParseException
from pydantic import BaseModel, EmailStr, field_validator
from stdnum import luhn

from src.domain.dtos.password import PasswordDTO


class UserBaseDTO(BaseModel):
    username: str
    email: EmailStr
    name: str
    phone_number: str
    inn: str
    card_number: str
    bank_code: str
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
                "username must consist only of english letters, digits and _ sign",
            )
        return value

    @field_validator("inn")
    @classmethod
    def validate_inn(cls, value: str) -> str:
        if len(value) not in (10, 12):
            raise ValueError("INN must be a string of 10 or 12 digits")
        if not value.isnumeric():
            raise ValueError("INN must consist only of digits")
        if len(value) == 10:
            coefficients = [2, 4, 10, 3, 5, 9, 4, 6, 8]
            check_sum = sum(int(value[i]) * coefficients[i] for i in range(9)) % 11 % 10
            valid = check_sum == int(value[9])
            if not valid:
                raise ValueError("INN is not valid")
            return value
        if len(value) == 12:
            coefficients_11 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]
            check_sum_11 = (
                sum(int(value[i]) * coefficients_11[i] for i in range(10)) % 11 % 10
            )
            coefficients_12 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]
            check_sum_12 = (
                sum(int(value[i]) * coefficients_12[i] for i in range(11)) % 11 % 10
            )
            valid = check_sum_11 == int(value[10]) and check_sum_12 == int(value[11])
            if not valid:
                raise ValueError("INN is not valid")
            return value

    @field_validator("card_number")
    @classmethod
    def validate_card_number(cls, value: str) -> str:
        if not luhn.is_valid(value):
            raise ValueError("card number is invalid")
        return value

    @field_validator("bank_code")
    @classmethod
    def validate_bank_code(cls, value: str) -> str:
        if len(value) != 9:
            raise ValueError("bank code must be a string of 9 digits")
        if not value.isnumeric():
            raise ValueError("bank code must consist only of digits")
        return value

    @field_validator("phone_number")
    @classmethod
    def validate_phone_number(cls, value: str) -> str:
        try:
            value = phonenumbers.parse(value, "RU")
            if phonenumbers.is_valid_number(value):
                return str(value.country_code) + str(value.national_number)
            raise ValueError("phone number is not valid")
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
