# Task Management API

A production-style Task Management REST API built with FastAPI, SQLAlchemy, and JWT authentication.

This project demonstrates real backend engineering patterns including authentication, authorization, testing, and clean architecture.

---

## Features

- User registration and login
- JWT-based authentication
- CRUD operations for tasks
- User-level authorization (users only access their own tasks)
- SQLite database for local development
- Automated tests with pytest

---

## Tech Stack

- Python 3.12
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic
- Pytest
- Uvicorn
- python-jose (JWT)

---

## Project Structure

task-management-api/
- app/
  - main.py        (FastAPI app and routes)
  - models.py     (Database models)
  - schemas.py    (Request and response schemas)
  - auth.py       (JWT and password hashing)
  - crud.py       (Database operations)
  - deps.py       (Dependency injection)
  - db.py         (Database configuration)
- tests/
  - test_auth.py
  - test_tasks.py
- requirements.txt
- README.md

---

## Running Locally

1. Clone the repository  
   git clone https://github.com/DChahbar/task-management-api.git

2. Navigate into the project  
   cd task-management-api

3. Create a virtual environment  
   python -m venv .venv

4. Activate the environment  
   Windows: .venv\Scripts\activate  
   macOS/Linux: source .venv/bin/activate

5. Install dependencies  
   pip install -r requirements.txt

6. Start the server  
   uvicorn app.main:app --reload

7. Open API documentation  
   http://127.0.0.1:8000/docs

---

## Authentication Flow

1. Register  
   POST /auth/register

2. Login  
   POST /auth/login

3. Copy the access token returned

4. In Swagger UI, click Authorize and enter  
   Bearer <your_token>

---

## Running Tests

Run the test suite with  
pytest -q

Tests use an isolated database and do not affect production data.

---

## Why This Project

This project was built to demonstrate:

- Secure authentication and authorization
- REST API best practices
- Clean separation of concerns
- Automated testing
- Production-style backend architecture

This repository is intended as a portfolio and interview-ready backend project.

---

## Contact

Darwish Chahbar  
Email: chahbar.darwish@gmail.com  
GitHub: https://github.com/DChahbar
