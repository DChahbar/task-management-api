Task Management API

A production-style Task Management REST API built with FastAPI, SQLAlchemy, and JWT authentication.

This project demonstrates real backend engineering patterns:

Authentication & authorization

Database modeling

Dependency injection

Automated testing

Clean project structure

🚀 Features

User registration & login

JWT-based authentication

CRUD operations for tasks

User-level task isolation (users can only access their own tasks)

SQLite database (easy local setup)

Pytest test suite with isolated test database

🛠 Tech Stack

Python 3.12

FastAPI

SQLAlchemy

SQLite

Pydantic

Pytest

Uvicorn

JWT (python-jose)

📂 Project Structure
task-management-api/
├── app/
│   ├── main.py        # FastAPI app & routes
│   ├── models.py     # SQLAlchemy models
│   ├── schemas.py    # Pydantic schemas
│   ├── auth.py       # JWT & password hashing
│   ├── crud.py       # Database operations
│   ├── deps.py       # Dependency injection
│   └── db.py         # Database configuration
├── tests/
│   ├── test_auth.py
│   └── test_tasks.py
├── requirements.txt
├── README.md
└── .gitignore

▶️ Running Locally
1. Clone the repository
git clone https://github.com/DChahbar/task-management-api.git
cd task-management-api

2. Create and activate a virtual environment

Windows

python -m venv .venv
.venv\Scripts\activate


macOS / Linux

python3 -m venv .venv
source .venv/bin/activate

3. Install dependencies
pip install -r requirements.txt

4. Start the server
uvicorn app.main:app --reload


Swagger UI:

http://127.0.0.1:8000/docs

🔐 Authentication Flow

Register

POST /auth/register


Login

POST /auth/login


Copy the returned access token

In Swagger UI, click Authorize and enter:

Bearer <your_token>

🧪 Running Tests
pytest -q


Uses an isolated SQLite test database

Does not affect production data

📌 Why This Project

This project was built to demonstrate:

Secure authentication and authorization

REST API design best practices

Clean separation of concerns

Automated testing with pytest

Production-ready backend structure

Designed as a portfolio-ready backend project.

📬 Contact

Darwish Chahbar
📧 chahbar.darwish@gmail.com

🔗 https://github.com/DChahbar
