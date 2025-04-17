import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from a .env file

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "default_secret")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///cleaning_service.db")  # Changed from DATABASE_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Added this line
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "default_jwt_secret")
    CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*")
    DEBUG = False


class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    DEBUG = False


config_by_name = {
    "development": DevelopmentConfig,
    "production": ProductionConfig
}