# Coffee Brew Log

A small full-stack app for logging coffee brews.

## Features

- Create a brew
- View all brews
- Filter brews by brew method
- Edit a brew
- Delete a brew
- Client-side and server-side validation
- Responsive Bootstrap UI
- JSON REST API
- SQLite database using SQLAlchemy ORM

## Technology

### Frontend
- React
- Vite
- Bootstrap

### Backend
- Python
- Flask
- Flask-SQLAlchemy
- SQLite
- Flask-CORS

## Project structure

```text
coffee-brew-log/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── models.py
│   │   └── routes.py
│   ├── .env.example
│   ├── Procfile
│   ├── requirements.txt
│   └── run.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BrewForm.jsx
│   │   │   └── BrewList.jsx
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
├── Documentation.md
├── deployment.md
└── .gitignore
```

## Database fields

Each brew contains:

- coffee_name
- brew_method
- dose_grams
- water_ml
- brew_time_seconds
- notes

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/brews` | List brews |
| GET | `/api/brews/<id>` | Get one brew |
| POST | `/api/brews` | Create a brew |
| PUT | `/api/brews/<id>` | Update a brew |
| DELETE | `/api/brews/<id>` | Delete a brew |

Filtering example:

```text
GET /api/brews?method=Pour%20Over
```

## HTTP status codes

- `200 OK` for successful reads, updates and deletes
- `201 Created` when a brew is created
- `400 Bad Request` for missing or invalid fields
- `404 Not Found` when the brew does not exist

## Local setup

### 1. Backend

Open PowerShell in the project folder:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
python run.py
```

The backend runs at:

```text
http://localhost:5000
```

### 2. Frontend

Open a second terminal:

```powershell
cd frontend
npm install
Copy-Item .env.example .env
npm run dev
```

Open the URL Vite displays, normally:

```text
http://localhost:5173
```

## Environment variables

Backend:

```text
DATABASE_URL=sqlite:///brews.db
FRONTEND_URL=http://localhost:5173
```

Frontend:

```text
VITE_API_URL=http://localhost:5000/api
```

Never commit `.env` files containing secrets.

## Suggested git history

Use one feature per commit:

```text
git add .
git commit -m "chore: set up full-stack project"

git add .
git commit -m "feat: add brew API CRUD endpoints"

git add .
git commit -m "feat: add brew log interface"

git add .
git commit -m "feat: add brew filtering and editing"

git add .
git commit -m "docs: add setup and deployment instructions"
```
