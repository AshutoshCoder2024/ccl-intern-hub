@echo off
REM Quick Start Script for CCL Intern Hub
REM This script helps set up and run the project

echo.
echo ╔════════════════════════════════════════════════╗
echo ║     CCL Intern Hub - Backend Setup Guide       ║
echo ╚════════════════════════════════════════════════╝
echo.

REM Check if backend folder exists
if not exist "backend" (
    echo ✗ Backend folder not found!
    echo Please ensure you're in the project root directory.
    pause
    exit /b 1
)

echo Step 1: Installing backend dependencies...
echo.
cd backend

REM Check if node_modules already exists
if exist "node_modules" (
    echo ✓ Dependencies already installed
) else (
    echo Installing packages...
    call npm install
    if errorlevel 1 (
        echo ✗ Failed to install dependencies
        pause
        exit /b 1
    )
    echo ✓ Dependencies installed successfully
)

echo.
echo Step 2: Checking .env file...
if exist ".env" (
    echo ✓ .env file exists
) else (
    echo ✗ .env file not found
    echo Creating .env from .env.example...
    if exist ".env.example" (
        copy .env.example .env
        echo ✓ .env created
    ) else (
        echo ✗ .env.example not found
    )
)

echo.
echo ╔════════════════════════════════════════════════╗
echo ║           Setup Complete!                      ║
echo ╚════════════════════════════════════════════════╝
echo.
echo Next steps:
echo.
echo 1. Configure MongoDB:
echo    - Edit backend\.env and update MONGODB_URI
echo    - Start MongoDB (mongod)
echo.
echo 2. Start the backend server:
echo    - From backend folder: npm run dev
echo.
echo 3. In another terminal, start frontend:
echo    - From frontend folder: cd frontend && npm run dev
echo.
echo 4. Access the admin dashboard:
echo    - http://localhost:5173/admin
echo.
echo 5. Create first admin account (in a terminal/Postman):
echo    - POST http://localhost:5000/api/admin/register
echo    - Body: {
echo      "name": "Admin",
echo      "email": "admin@example.com",
echo      "password": "password123",
echo      "role": "super-admin"
echo    }
echo.
echo For detailed instructions, see:
echo - BACKEND_SETUP.md
echo - backend/README.md
echo.
pause
