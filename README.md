# Task Management API

A production-style **Task Management REST API** built with **FastAPI**, **SQLAlchemy**, and **JWT authentication**.

This project demonstrates real backend engineering patterns:
- Authentication & authorization
- Database modeling and migrations
- Dependency injection
- Automated testing
- Clean project structure

---

## 🚀 Features

- User registration & login
- JWT-based authentication
- CRUD operations for tasks
- User-level task isolation (users can only access their own tasks)
- SQLite database (easy local setup)
- Pytest test suite with isolated test database

---

## 🛠 Tech Stack

- **Python 3.12**
- **FastAPI**
- **SQLAlchemy**
- **SQLite**
- **Pydantic**
- **Pytest**
- **Uvicorn**
- **JWT (python-jose)**

---

## 📂 Project Structure

task-management-api/
├── app/
│ ├── main.py # FastAPI app & routes
│ ├── models.py # SQLAlchemy models
│ ├── schemas.py # Pydantic schemas
│ ├── auth.py # JWT & password hashing
│ ├── crud.py # Database operations
│ ├── deps.py # Dependency injection
│ └── db.py # Database configuration
├── tests/
│ ├── test_auth.py
│ └── test_tasks.py
├── requirements.txt
├── README.md
└── .gitignore

yaml
Copy code

---

## ▶️ Running Locally

### 1. Clone the repo
```bash
git clone https://github.com/DChahbar/task-management-api.git
cd task-management-api
2. Create & activate a virtual environment
bash
Copy code
python -m venv .venv
source .venv/bin/activate   # macOS/Linux
.venv\Scripts\activate      # Windows
3. Install dependencies
bash
Copy code
pip install -r requirements.txt
4. Start the server
bash
Copy code
uvicorn app.main:app --reload
Visit:

API docs: http://127.0.0.1:8000/docs

🔐 Authentication Flow
Register

arduino
Copy code
POST /auth/register
Login

bash
Copy code
POST /auth/login
Copy the returned JWT token

Click Authorize in Swagger UI and enter:

php-template
Copy code
Bearer <your_token>
🧪 Running Tests
bash
Copy code
pytest -q
Uses an isolated in-memory SQLite database

Does not touch production data

📌 Why This Project
This project was built to demonstrate:

Clean backend architecture

Secure authentication

Test-driven development

Readable, maintainable code

It is intended as a portfolio / interview-ready backend project.

📬 Contact
Darwish Chahbar
📧 chahbar.darwish@gmail.com
🔗 https://github.com/DChahbar
