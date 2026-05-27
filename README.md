# Angular Role-Based User Management App

This is a modern Single Page Application (SPA) built to demonstrate role-based access control (RBAC), full CRUD user management, and asynchronous processing handling. 

## 🚀 Technologies Used
- **Frontend:** Angular 21 (Zoneless Change Detection), SCSS (Glassmorphism UI Theme)
- **Backend:** Node.js, Express, TypeScript, Nodemon
- **Database:** Local JSON File (`db.json`) as a mock database

## ✨ Features Implemented
- **Role-Based Authentication:** Users can log in as a "General User" or "Admin". 
- **Dashboard:** General Users have access to a dashboard displaying only their specific records.
- **Admin Control Panel:** Admins have full access to an intuitive User Management interface.
- **Full CRUD Support:** Admins can Create, Read, Update, and Delete users from the system via a modern popup modal.
- **Async Delay Simulation:** The backend API deliberately simulates a network delay (1.5 seconds) to demonstrate asynchronous data fetching, loading spinners, and proper UI state management in the frontend.
- **Modern Angular Design:** Built using Angular's latest Zoneless paradigm (`provideZonelessChangeDetection`), `ReactiveFormsModule`, and Signals/RxJS observables.

## 🛠️ Project Structure

```
angular-role-based-app/
├── backend/                  # Node.js + Express API
│   ├── src/index.ts          # Core API routes & logic
│   ├── db.json               # Local JSON Database
│   ├── package.json          
│   └── tsconfig.json         
├── frontend/                 # Angular 21 SPA
│   ├── src/app/
│   │   ├── components/       # Login, Dashboard, and Admin features
│   │   ├── services/         # ApiService, UserService (State)
│   │   ├── app.config.ts     # Zoneless angular setup
│   │   └── app.routes.ts     # Application routing
│   ├── src/styles.scss       # Global CSS/SCSS Theme
│   └── package.json          
└── README.md
```

## 💻 How to Run Locally

Because the project is separated into a frontend and a backend, you will need to open **two** terminal windows.

### 1. Start the Backend API
The backend acts as the database server, simulating database operations and async delays.

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start the Node.js server (runs on port 3000 with nodemon hot-reloading)
npm start
```

### 2. Start the Frontend Application
The frontend is built on Angular 21 and uses SCSS for its premium styling.

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the Angular development server
npm start
```

Once both servers are running, open your browser and navigate to:
**http://localhost:4200/**

## 🔑 Test Credentials
You can use the following credentials to test the role-based functionality:

**Admin User:**
- User ID: `admin_user`
- Password: `password123`

**General User:**
- User ID: `general_user`
- Password: `password123`

## 🎨 Design & UI
The application uses a "Glassmorphism" design system constructed purely via modern CSS variables and SCSS. This ensures a clean, professional, and visually engaging experience without relying on bulky external UI libraries like Bootstrap or Material. Features include custom toast notifications, loading animations, gradient backgrounds, and modal overlays.
