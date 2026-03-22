import os
from contextlib import contextmanager
from typing import Any

import pymysql
from pymysql.cursors import DictCursor


class Database:
    def __init__(self) -> None:
        self.config = {
            'host': os.getenv('DB_HOST', 'db'),
            'port': int(os.getenv('DB_PORT', '3306')),
            'user': os.getenv('DB_USER', 'registro'),
            'password': os.getenv('DB_PASSWORD', 'registro123'),
            'database': os.getenv('DB_NAME', 'registro_elettronico'),
            'cursorclass': DictCursor,
            'autocommit': True,
        }

    @contextmanager
    def connection(self):
        conn = pymysql.connect(**self.config)
        try:
            yield conn
        finally:
            conn.close()

    def fetch_all(self, query: str, params: tuple[Any, ...] | None = None) -> list[dict[str, Any]]:
        with self.connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, params or ())
                return cursor.fetchall()

    def fetch_one(self, query: str, params: tuple[Any, ...] | None = None) -> dict[str, Any] | None:
        with self.connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, params or ())
                return cursor.fetchone()

    def execute(self, query: str, params: tuple[Any, ...] | None = None) -> int:
        with self.connection() as conn:
            with conn.cursor() as cursor:
                affected_rows = cursor.execute(query, params or ())
                conn.commit()
                return affected_rows
