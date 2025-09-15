Fiesta Finder Backend

Setup

1. Copy .env.example to .env and adjust values.
2. npm install
3. npm run seed (optional to preload festivals)
4. npm run dev

API

- GET /api/health
- POST /api/auth/register {name,email,password}
- POST /api/auth/login {email,password}
- GET /api/auth/me (Bearer token)
- GET /api/festivals?q=&category=&month=
- GET /api/festivals/:id
- POST /api/festivals (Bearer token)
- GET /api/me/favorites (Bearer token)
- POST /api/me/favorites/:festivalId/toggle (Bearer token)


