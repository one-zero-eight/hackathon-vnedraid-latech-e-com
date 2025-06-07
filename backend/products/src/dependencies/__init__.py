from dishka import AsyncContainer, make_async_container
from dishka.integrations.fastapi import FastapiProvider

from src.dependencies.db import DbProvider
from src.dependencies.repositories.item import ItemRepositoryProvider
from src.dependencies.seller import SellerIdProvider


def create_async_container() -> AsyncContainer:
    container = make_async_container(
        DbProvider(),
        FastapiProvider(),
        ItemRepositoryProvider(),
        SellerIdProvider(),
    )
    return container
