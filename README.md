# E-Magazine Platform

Welcome to the fullstack E-Magazine platform built with the MERN stack (MongoDB, Express, React/Next.js).

## Prerequisites
Before you start, make sure you have the following installed on your machine:
- **Node.js** (v18 or newer recommended)
- **MongoDB Server** (Running locally on default port `27017` unconditionally)

## How to Run from Scratch in VS Code

### 1. Open the Project in VS Code
1. Open your terminal or file explorer.
2. Navigate to the project root folder:
   ```bash
   cd "c:\Users\Vishal Yadav ji\Desktop\df"
   ```
3. Open the folder in VS Code by typing:
   ```bash
   code .
   ```

### 2. Set up the Backend Server
The Backend connects to MongoDB, serves API routes, and manages user state.
1. In VS Code, open a New Terminal (`Ctrl` + `` ` `` or `Terminal -> New Terminal`).
2. Move into the `backend` directory:
   ```bash
   cd backend
   ```
3. Install all necessary dependencies:
   ```bash
   npm install
   ```
4. Start the database seeder if you want to regenerate all 55 magazines and 275+ wiki articles:
   ```bash
   npm run seed
   ```
   *(Or just run the advanced seeder directly: `node reseed.js`)*
5. Finally, spin up the backend Node/Express server:
   ```bash
   npm run dev
   ```
   This runs the server using Nodemon on port `5001`. Leave this terminal open!

### 3. Set up the Frontend Server
The Frontend renders the React user interface using Next.js.
1. Open a **second** New Terminal inside VS Code (click the `+` icon in your terminal panel).
2. Move into the `frontend` directory:
   ```bash
   cd frontend
   ```
3. Install frontend dependencies:
   ```bash
   npm install
   ```
4. Start the Next.js development server:
   ```bash
   npm run dev
   ```

### 4. View the App!
With both terminals running simultaneously:
1. Open your web browser (Chrome, Edge, etc.)
2. Navigate to: [http://localhost:3001](http://localhost:3001)

You're all set! 

---
### Pre-configured Accounts
If you reset your database, you can log in natively with the master admin user:
- **Email**: `admin@example.com`
- **Password**: `password123`
