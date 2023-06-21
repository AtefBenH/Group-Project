import redis
import uuid


class ApplicationConfig:
    
    SECRET_KEY = uuid.uuid4().hex
    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESION_USE_SIGNER =True
    SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")