# CCL Intern Hub Backend

This is the backend server for the CCL Intern Hub application, built with Express.js and MongoDB.

## Project Structure

```
backend/
├── config/
│   └── mongodb.js          # MongoDB connection setup
├── models/
│   ├── Admin.js            # Admin user schema
│   └── Internship.js       # Internship listing schema
├── controllers/
│   ├── adminController.js  # Admin logic (register, login, CRUD)
│   └── internshipController.js # Internship management logic
├── routes/
│   ├── adminRoutes.js      # Admin endpoints
│   └── internshipRoutes.js # Internship endpoints
├── middleware/
│   └── auth.js             # JWT authentication middleware
├── server.js               # Main server file
├── package.json            # Dependencies and scripts
├── .env.example            # Environment variables template
└── README.md               # This file
```

## Features

- **Admin Management**: Register, login, and manage admin users with JWT authentication
- **Internship Management**: Create, read, update, and delete internship listings
- **Authentication**: Secure JWT-based authentication for admin operations
- **MongoDB Integration**: Persistent data storage with MongoDB

## Installation

1. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables**:
   - Copy `.env.example` to `.env`
   - Update the values:
     ```
     MONGODB_URI=mongodb://localhost:27017/ccl-intern-hub
     JWT_SECRET=your_secure_secret_key
     PORT=5000
     CLIENT_URL=http://localhost:5173
     ```

3. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Admin Routes (`/api/admin`)

#### Public Endpoints
- **POST** `/register` - Register a new admin
  ```json
  {
    "name": "Admin Name",
    "email": "admin@example.com",
    "password": "password123",
    "role": "admin"
  }
  ```

- **POST** `/login` - Login admin
  ```json
  {
    "email": "admin@example.com",
    "password": "password123"
  }
  ```
  Returns: `{ token, admin }`

#### Protected Endpoints (Require JWT Token)
- **GET** `/` - Get all admins
- **GET** `/:id` - Get admin by ID
- **PUT** `/:id` - Update admin
- **DELETE** `/:id` - Delete admin

### Internship Routes (`/api/internships`)

#### Public Endpoints
- **GET** `/` - Get all internships (supports filters: `status`, `category`)
- **GET** `/:id` - Get internship by ID

#### Protected Endpoints (Require JWT Token)
- **POST** `/` - Create new internship
  ```json
  {
    "title": "Frontend Intern",
    "description": "Work on React projects",
    "company": "Tech Company",
    "location": "Remote",
    "stipend": 10000,
    "duration": "3 months",
    "requirements": ["React", "JavaScript", "CSS"],
    "category": "web",
    "applicationDeadline": "2024-12-31"
  }
  ```

- **PUT** `/:id` - Update internship
- **DELETE** `/:id` - Delete internship

## Authentication

All protected endpoints require a JWT token in the `Authorization` header:
```
Authorization: Bearer <token>
```

## Database Models

### Admin Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (admin | super-admin),
  isActive: Boolean,
  timestamps: true
}
```

### Internship Schema
```javascript
{
  title: String,
  description: String,
  company: String,
  location: String,
  stipend: Number,
  duration: String,
  requirements: [String],
  category: String (web | mobile | data-science | ai-ml | devops | other),
  status: String (active | inactive | archived),
  applicationDeadline: Date,
  postedDate: Date,
  timestamps: true
}
```

## Technologies Used

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Nodemon** - Development auto-reload

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/ccl-intern-hub` |
| `JWT_SECRET` | Secret key for JWT signing | `your_jwt_secret_key` |
| `PORT` | Server port | `5000` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:5173` |

## Error Handling

The server includes comprehensive error handling:
- Validation errors (400)
- Authentication errors (401)
- Not found errors (404)
- Server errors (500)

All errors are returned in JSON format with descriptive messages.

## Development Notes

- Passwords are automatically hashed using bcryptjs before saving to the database
- JWT tokens expire after 7 days
- CORS is configured to allow requests from the client application
- MongoDB connection includes retry logic and detailed logging

## Next Steps

1. Configure MongoDB connection string in `.env`
2. Install backend dependencies: `npm install`
3. Start the backend server: `npm run dev`
4. Use the `/api/health` endpoint to verify the server is running
5. Access the admin dashboard at the frontend URL to manage internships

## Support

For issues or questions, please check the main project README or contact the development team.
