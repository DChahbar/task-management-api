# tests/test_auth.py
def test_register_success(client):
    res = client.post("/auth/register", json={"email": "a@a.com", "password": "pass1234"})
    assert res.status_code == 201, res.text
    data = res.json()
    assert data["email"] == "a@a.com"
    assert "id" in data
    assert "created_at" in data


def test_register_duplicate_email(client):
    client.post("/auth/register", json={"email": "dup@a.com", "password": "pass1234"})
    res = client.post("/auth/register", json={"email": "dup@a.com", "password": "pass1234"})
    assert res.status_code == 400, res.text


def test_login_success_returns_token(client):
    client.post("/auth/register", json={"email": "login@a.com", "password": "pass1234"})
    res = client.post(
        "/auth/login",
        data={"username": "login@a.com", "password": "pass1234"},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    assert res.status_code == 200, res.text
    data = res.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"


def test_login_wrong_password_fails(client):
    client.post("/auth/register", json={"email": "wrong@a.com", "password": "pass1234"})
    res = client.post(
        "/auth/login",
        data={"username": "wrong@a.com", "password": "nope"},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    assert res.status_code == 401, res.text
