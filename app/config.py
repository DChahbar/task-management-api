from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = "sqlite:///./task_management.db"
    secret_key: str = "dev-secret-key-change-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    cors_origins: str = "http://localhost:5173,http://127.0.0.1:5173,http://localhost:8080,http://127.0.0.1:8080"
    # Allows Vite dev server on any port (5173, 5174, …)
    cors_origin_regex: str = r"https?://(localhost|127\.0\.0\.1)(:\d+)?"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


settings = Settings()
