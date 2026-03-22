import os
from functools import wraps
from typing import Any, Callable

from flask import jsonify, request
from jose import jwt
from jose.exceptions import ExpiredSignatureError, JWTError
from keycloak import KeycloakOpenID


class KeycloakAuth:
    def __init__(self) -> None:
        self.server_url = os.getenv('KEYCLOAK_SERVER_URL', 'http://localhost:8080/')
        self.realm = os.getenv('KEYCLOAK_REALM', 'registro-realm')
        self.client_id = os.getenv('KEYCLOAK_CLIENT_ID', 'registro-frontend')
        self.openid = KeycloakOpenID(
            server_url=self.server_url,
            client_id=self.client_id,
            realm_name=self.realm,
        )

    def decode_token(self, token: str) -> dict[str, Any]:
        public_key = '-----BEGIN PUBLIC KEY-----\n' + self.openid.public_key() + '\n-----END PUBLIC KEY-----'
        return jwt.decode(
            token,
            public_key,
            algorithms=['RS256'],
            audience=self.client_id,
            options={'verify_aud': False},
        )


auth_service = KeycloakAuth()


def token_required(roles: list[str] | None = None) -> Callable:
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs):
            auth_header = request.headers.get('Authorization', '')
            if not auth_header.startswith('Bearer '):
                return jsonify({'message': 'Token mancante'}), 401

            token = auth_header.split(' ', maxsplit=1)[1]
            try:
                payload = auth_service.decode_token(token)
            except ExpiredSignatureError:
                return jsonify({'message': 'Token scaduto'}), 401
            except JWTError:
                return jsonify({'message': 'Token non valido'}), 401

            realm_roles = payload.get('realm_access', {}).get('roles', [])
            if roles and not any(role in realm_roles for role in roles):
                return jsonify({'message': 'Accesso negato'}), 403

            request.user = payload
            return func(*args, **kwargs)

        return wrapper

    return decorator
