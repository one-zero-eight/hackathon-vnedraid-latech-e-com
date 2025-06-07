from dishka import AsyncContainer, make_async_container
from dishka.integrations.fastapi import FastapiProvider

from src.dependencies.db import DbProvider


def create_async_container() -> AsyncContainer:
    container = make_async_container(
        DbProvider(),
        FastapiProvider(),
    )
    return container
