# Leonard Juma Portfolio

A portfolio website built with a Vite frontend and a Django contact API. Django stores contact messages in a local SQLite database.

## Run the Django backend

From PowerShell:

```powershell
cd backend\PortFolio
python -m venv ..\port
..\port\Scripts\Activate.ps1
pip install -r requirements.txt
$env:DJANGO_SECRET_KEY = python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
$env:DJANGO_DEBUG = "true"
python manage.py migrate
python manage.py runserver
```

Keep the backend running at `http://127.0.0.1:8000` while using the frontend. The SQLite database is created locally and is not included in Git.

## Run the frontend

In a second terminal:

```powershell
cd frontend\frontend
npm ci
npm run dev
```

Open the local Vite URL shown in the terminal. Vite proxies `/api` requests to the Django backend.
