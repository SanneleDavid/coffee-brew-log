# Deployment

The assessment asks for a deployed URL. This file is intentionally kept as a step-by-step deployment guide so the final deployed URLs can be added after deployment.

## Recommended simple setup

Deploy the backend and frontend as two services.

- Backend: Render Web Service
- Frontend: Render Static Site

The repository has separate `backend` and `frontend` folders.

## Backend deployment on Render

1. Create a Render account.
2. Create a new Web Service.
3. Connect the GitHub repository.
4. Set the root directory to:

```text
backend
```

5. Build command:

```text
pip install -r requirements.txt
```

6. Start command:

```text
gunicorn run:app
```

7. Add environment variables:

```text
DATABASE_URL=sqlite:///brews.db
FRONTEND_URL=https://YOUR-FRONTEND-URL.onrender.com
```

8. Deploy.
9. Copy the backend URL.

## Frontend deployment on Render

1. Create a new Static Site.
2. Connect the same GitHub repository.
3. Set the root directory to:

```text
frontend
```

4. Build command:

```text
npm install && npm run build
```

5. Publish directory:

```text
dist
```

6. Add:

```text
VITE_API_URL=https://YOUR-BACKEND-URL.onrender.com/api
```

7. Deploy.

## Important SQLite note

SQLite is excellent for local development and satisfies the SQL database requirement. On cloud hosting, a managed PostgreSQL database is preferable if the assessment expects data to survive server replacement/redeployment.

If using Render PostgreSQL, replace the backend `DATABASE_URL` with the PostgreSQL connection string supplied by Render.

## Final deployed URL

After deployment, replace the placeholder below:

```text
Frontend: https://YOUR-FRONTEND-URL.onrender.com
Backend: https://YOUR-BACKEND-URL.onrender.com
```

## Troubleshooting notes

### CORS error

Check that the backend `FRONTEND_URL` exactly matches the frontend URL.

### Frontend cannot reach backend

Check `VITE_API_URL` and make sure it ends with `/api`.

### Database errors

Check `DATABASE_URL` and redeploy the backend after changing environment variables.

### Build errors

Run locally first:

```powershell
cd frontend
npm install
npm run build
```

For the backend:

```powershell
cd backend
pip install -r requirements.txt
python run.py
```
