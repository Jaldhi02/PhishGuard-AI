"""
PhishGuard AI — JWT Authentication & Security Handler
"""

import time
import jwt
from typing import Dict, Any, Optional

JWT_SECRET = "PHISHGUARD_AI_SUPER_SECRET_KEY_2026"
JWT_ALGORITHM = "HS256"
TOKEN_EXPIRATION_SECONDS = 86400  # 24 Hours

def generate_jwt_token(user_id: str, email: str, role: str = "security_analyst") -> str:
    payload = {
        "user_id": user_id,
        "email": email,
        "role": role,
        "exp": int(time.time()) + TOKEN_EXPIRATION_SECONDS,
        "iss": "PhishGuard_AI_Auth"
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token

def verify_jwt_token(token: str) -> Optional[Dict[str, Any]]:
    try:
        decoded = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return decoded
    except jwt.PyJWTError:
        return None
