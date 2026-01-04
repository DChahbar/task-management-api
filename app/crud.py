# app/crud.py
from sqlalchemy.orm import Session

from . import models, schemas
from .auth import hash_password, verify_password


# =====================
# USERS
# =====================

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def create_user(db: Session, user_in: schemas.UserCreate):
    existing = get_user_by_email(db, user_in.email)
    if existing:
        return None  # caller will handle error

    user = models.User(
        email=user_in.email,
        hashed_password=hash_password(user_in.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user


# =====================
# TASKS
# =====================

def create_task(db: Session, owner_id: int, task_in: schemas.TaskCreate):
    task = models.Task(
        title=task_in.title,
        description=task_in.description,
        owner_id=owner_id,
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


def list_tasks(db: Session, owner_id: int):
    return (
        db.query(models.Task)
        .filter(models.Task.owner_id == owner_id)
        .order_by(models.Task.created_at.desc())
        .all()
    )


def get_task(db: Session, owner_id: int, task_id: int):
    return (
        db.query(models.Task)
        .filter(models.Task.owner_id == owner_id, models.Task.id == task_id)
        .first()
    )


def update_task(db: Session, owner_id: int, task_id: int, updates: schemas.TaskUpdate):
    task = get_task(db, owner_id, task_id)
    if not task:
        return None

    if updates.title is not None:
        task.title = updates.title
    if updates.description is not None:
        task.description = updates.description
    if updates.completed is not None:
        task.completed = updates.completed

    db.commit()
    db.refresh(task)
    return task


def delete_task(db: Session, owner_id: int, task_id: int) -> bool:
    task = get_task(db, owner_id, task_id)
    if not task:
        return False

    db.delete(task)
    db.commit()
    return True
