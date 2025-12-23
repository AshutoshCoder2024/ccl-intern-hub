# CCL Intern Hub

A professional internship management platform for Central Coalfields Limited (CCL) Ranchi.

## 🚀 Features

### User Features
- **User Registration & Authentication**: Secure registration and login system
- **Internship Browsing**: Browse available internships with detailed information
- **Application Management**: Submit and track internship applications
- **Dashboard**: View application status and profile information
- **Real-time Updates**: Track application status (Pending, Under Review, Accepted, Rejected)

### Admin Features
- **Admin Dashboard**: Comprehensive dashboard with statistics and management tools
- **Internship Management**: Create, update, and delete internship listings
- **Application Management**: Review and update application statuses
- **Seat Management**: Track available seats and automatically lock when full
- **User Management**: Manage admin users and permissions
- **Reports & Analytics**: View system statistics and reports

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Shadcn UI** for professional component library
- **React Router** for navigation
- **React Query** for data fetching

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing

## 📁 Project Structure

```
ccl-intern-hub/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── ui/         # Shadcn UI components
│   │   │   └── ...         # Custom components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utilities and helpers
│   │   ├── hooks/          # Custom React hooks
│   │   └── assets/         # Static assets
│   └── public/             # Public files
├── backend/                 # Express.js API server
│   ├── config/             # Configuration files
│   ├── controllers/        # Business logic
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Authentication middleware
│   └── scripts/            # Utility scripts
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- **Node.js** v16 or higher
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ccl-intern-hub
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file in the `backend` directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key_here
   PORT=5000
   CLIENT_URL=http://localhost:8080
   ```
   
   Start the backend server:
   ```bash
   npm run dev
   ```
   
   Create admin account:
   ```bash
   npm run create-admin
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Quick Start Scripts

Use the provided scripts for Windows:
- **PowerShell**: `.\QUICK_START.ps1`
- **Batch**: `QUICK_START.bat`

## 📖 Usage Guide

### For Users
1. Register at `/user-register`
2. Login at `/user-login`
3. Browse internships at `/internships`
4. Click "Apply Now" on any internship
5. Fill out the application form
6. Track your application status at `/dashboard`

### For Admins
1. Login at `/login` (Default: `admin@ccl.com` / `password123`)
2. Access admin dashboard at `/admin`
3. Manage internships, applications, and users from the dashboard tabs

## 🔌 API Endpoints

### User Endpoints
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Application Endpoints
- `POST /api/applications` - Submit application (user, protected)
- `GET /api/applications/my-applications` - Get user's applications (user, protected)
- `GET /api/applications` - Get all applications (admin, protected)
- `PUT /api/applications/:id/status` - Update application status (admin, protected)

### Admin Endpoints
- `POST /api/admin/register` - Register admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin` - Get all admins (protected)
- `DELETE /api/admin/:id` - Delete admin (protected)

### Internship Endpoints
- `GET /api/internships` - Get all internships
- `POST /api/internships` - Create internship (admin, protected)
- `PUT /api/internships/:id` - Update internship (admin, protected)
- `DELETE /api/internships/:id` - Delete internship (admin, protected)

## 🔐 Default Admin Credentials

After running `npm run create-admin`:
- **Email**: `admin@ccl.com`
- **Password**: `password123`

⚠️ **Important**: Change the default password after first login.

## 📝 Features in Detail

### Seat Management
- Admins can set the number of seats for each internship
- Applications automatically lock when seats are full
- Rejecting an application frees up a seat
- Real-time seat tracking with visual indicators

### Application Status Flow
1. **Pending** - Application submitted, awaiting review
2. **Under Review** - Application is being reviewed
3. **Accepted** - Application accepted
4. **Rejected** - Application rejected (seat freed)

## 🤝 Contributing

This is a proprietary project for Central Coalfields Limited. For internal contributions, please follow the coding standards and create pull requests for review.

## 📄 License

This project is proprietary software for Central Coalfields Limited (CCL).

---

**Central Coalfields Limited** - Empowering future mining professionals through quality internship programs.
