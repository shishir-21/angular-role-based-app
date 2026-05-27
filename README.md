# Role-Based Ticket Management System

A modern full-stack Single Page Application (SPA) built using Angular and Node.js to demonstrate role-based authentication, user management, asynchronous API handling, and a premium glassmorphism UI design.

This project was developed as part of a Software Engineer Internship code challenge.

---

#  Features

- Role-based authentication system
- Admin and General User access control
- Full CRUD user management
- User-specific records dashboard
- Async API delay simulation with loading states
- Modern glassmorphism UI design
- Reactive Angular forms and modular architecture
- JSON-based mock database integration
- Modular frontend and backend structure
- Responsive and professional dashboard UI

---

#  Tech Stack

## Frontend
- Angular
- TypeScript
- SCSS
- RxJS
- Reactive Forms

## Backend
- Node.js
- Express.js
- TypeScript
- Nodemon

## Database
- Local JSON File (`db.json`) used as a mock database

---

#  Project Structure

```bash
angular-role-based-app/
├── backend/
│   ├── src/
│   │   └── index.ts
│   ├── db.json
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   │
│   ├── src/styles.scss
│   └── package.json
│
├── README.md
└── .gitignore
```

---

#  API Documentation

The Node.js backend serves several REST API endpoints. It includes a `delay` query parameter to simulate asynchronous processing.

- `POST /api/login`: Validates credentials and returns the user object.
- `GET /api/records`: Fetches records filtered by `userId` and `role`.
- `GET /api/users`: Returns all users (Requires `role=Admin`).
- `POST /api/users`: Creates a new user (Requires `role=Admin`).
- `PUT /api/users/:id`: Updates an existing user (Requires `role=Admin`).
- `DELETE /api/users/:id`: Deletes a user (Requires `role=Admin`).

---

#  Setup & Installation

You need two terminal windows to run this full-stack application locally.

### 1. Start the Backend API (Terminal 1)
```bash
cd backend
npm install
npm start
```
*Note: The backend runs on `http://localhost:3000` and uses `nodemon` for hot-reloading.*

### 2. Start the Frontend (Terminal 2)
```bash
cd frontend
npm install
npm start
```
*Note: The Angular frontend runs on `http://localhost:4200`.*

#  Role-Based Access

| Role | Permissions |
|------|-------------|
| Admin | Full CRUD access and dashboard access |
| General User | Dashboard access with user-specific records |

### Test Credentials
- **Admin**: `admin_user` / `password123`
- **User**: `general_user` / `password123`
