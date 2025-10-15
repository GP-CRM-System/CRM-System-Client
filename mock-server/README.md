Mock API for local development

This small Express mock server provides minimal auth endpoints so the frontend can be tested without a real backend.

Endpoints:
- POST /api/auth/register  { name, email, password } -> sets cookie token and returns { user, token }
- POST /api/auth/login     { email, password } -> sets cookie token and returns { user, token }
- GET  /api/auth/me        -> reads cookie or Authorization header and returns { user }

Seeded user:
- email: admin@local
- password: password
- role: admin (full permissions)

How to run:
1. Install new deps (adds express + cors + cookie-parser):

```bash
npm install
```

2. Start mock server:

```bash
npm run mock
```

3. Start frontend (in another terminal):

```bash
npm run dev
```

Notes:
- The mock server allows CORS from http://localhost:5173 (Vite default) and uses cookies for the token.
- Use the seeded admin user to test admin flows or register new users via the frontend register form.
