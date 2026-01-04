# tests/test_tasks.py
def register_and_login(client, email="user@a.com", password="pass1234"):
    client.post("/auth/register", json={"email": email, "password": password})
    res = client.post(
        "/auth/login",
        data={"username": email, "password": password},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    token = res.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


def test_cannot_create_task_without_token(client):
    res = client.post("/tasks", json={"title": "t1", "description": "d"})
    assert res.status_code == 401, res.text


def test_create_and_list_tasks(client):
    headers = register_and_login(client, "t@a.com")
    res1 = client.post("/tasks", json={"title": "Task 1", "description": "D1"}, headers=headers)
    assert res1.status_code == 201, res1.text

    res2 = client.get("/tasks", headers=headers)
    assert res2.status_code == 200, res2.text
    data = res2.json()
    assert len(data) == 1
    assert data[0]["title"] == "Task 1"


def test_user_cannot_access_other_users_task(client):
    headers_a = register_and_login(client, "a@a.com")
    headers_b = register_and_login(client, "b@a.com")

    create = client.post("/tasks", json={"title": "Secret", "description": None}, headers=headers_a)
    task_id = create.json()["id"]

    # User B tries to read A's task
    res = client.get(f"/tasks/{task_id}", headers=headers_b)
    assert res.status_code == 404, res.text


def test_patch_task_updates_fields(client):
    headers = register_and_login(client, "patch@a.com")
    create = client.post("/tasks", json={"title": "Old", "description": "x"}, headers=headers)
    task_id = create.json()["id"]

    patch = client.patch(f"/tasks/{task_id}", json={"title": "New", "completed": True}, headers=headers)
    assert patch.status_code == 200, patch.text
    data = patch.json()
    assert data["title"] == "New"
    assert data["completed"] is True


def test_delete_task(client):
    headers = register_and_login(client, "del@a.com")
    create = client.post("/tasks", json={"title": "Del", "description": None}, headers=headers)
    task_id = create.json()["id"]

    res = client.delete(f"/tasks/{task_id}", headers=headers)
    assert res.status_code == 204, res.text

    # Verify it's gone
    res2 = client.get(f"/tasks/{task_id}", headers=headers)
    assert res2.status_code == 404, res2.text
