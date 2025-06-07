import datetime

from sqlalchemy import TIMESTAMP, Boolean, Column, String
from sqlalchemy.orm import Mapped, mapped_column

from src.db.base import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(50), unique=True)
    name: Mapped[str] = mapped_column(String(100))
    email: Mapped[str] = mapped_column(String(50), unique=True)
    hashed_password: Mapped[str]
    password_updated_at = Column(
        type_=TIMESTAMP(timezone=True),
        default=lambda: datetime.datetime.now(datetime.timezone.utc)
        - datetime.timedelta(minutes=10),
    )
    is_active: Mapped[bool] = mapped_column(Boolean, default=False)
    inn: Mapped[str] = mapped_column(String(12), unique=True)
    card_number: Mapped[str] = mapped_column(String(20))
    bank_code: Mapped[str] = mapped_column(String(9))
    phone_number: Mapped[str] = mapped_column(String(18), unique=True)
    bank_name: Mapped[str]
