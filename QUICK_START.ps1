#!/usr/bin/env pwsh
# Quick Start Script for CCL Intern Hub (PowerShell)
# Run: .\QUICK_START.ps1

Write-Host "`n"
Write-Host "╔════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   CCL Intern Hub - Backend Setup Guide         ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host "`n"

# Check if backend folder exists
if (-not (Test-Path "backend")) {
    Write-Host "✗ Backend folder not found!" -ForegroundColor Red
    Write-Host "Please ensure you're in the project root directory." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Step 1: Installing backend dependencies..." -ForegroundColor Green
Write-Host ""

Set-Location backend

# Check if node_modules already exists
if (Test-Path "node_modules") {
    Write-Host "✓ Dependencies already installed" -ForegroundColor Green
} else {
    Write-Host "Installing packages..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Host "✓ Dependencies installed successfully" -ForegroundColor Green
}

Write-Host "`n"
Write-Host "Step 2: Checking .env file..." -ForegroundColor Green

if (Test-Path ".env") {
    Write-Host "✓ .env file exists" -ForegroundColor Green
} else {
    Write-Host "✗ .env file not found" -ForegroundColor Yellow
    Write-Host "Creating .env from .env.example..." -ForegroundColor Yellow
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Write-Host "✓ .env created" -ForegroundColor Green
    } else {
        Write-Host "✗ .env.example not found" -ForegroundColor Red
    }
}

Write-Host "`n"
Write-Host "╔════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║         Setup Complete! 🎉                     ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host "`n"

Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Configure MongoDB:" -ForegroundColor Yellow
Write-Host "   - Edit backend\.env and update MONGODB_URI" -ForegroundColor White
Write-Host "   - Start MongoDB (mongod)" -ForegroundColor White
Write-Host ""
Write-Host "2. Start the backend server:" -ForegroundColor Yellow
Write-Host "   - From backend folder: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "3. In another terminal, start frontend:" -ForegroundColor Yellow
Write-Host "   - From frontend folder: cd frontend && npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "4. Access the admin dashboard:" -ForegroundColor Yellow
Write-Host "   - http://localhost:5173/admin" -ForegroundColor White
Write-Host ""
Write-Host "5. Create first admin account (in a terminal/Postman):" -ForegroundColor Yellow
Write-Host "   - POST http://localhost:5000/api/admin/register" -ForegroundColor White
Write-Host "   - Body: {" -ForegroundColor Gray
Write-Host '       "name": "Admin",' -ForegroundColor Gray
Write-Host '       "email": "admin@example.com",' -ForegroundColor Gray
Write-Host '       "password": "password123",' -ForegroundColor Gray
Write-Host '       "role": "super-admin"' -ForegroundColor Gray
Write-Host "     }" -ForegroundColor Gray
Write-Host ""
Write-Host "For detailed instructions, see:" -ForegroundColor Cyan
Write-Host "- BACKEND_SETUP.md" -ForegroundColor White
Write-Host "- backend/README.md" -ForegroundColor White
Write-Host "`n"

Read-Host "Press Enter to exit"
