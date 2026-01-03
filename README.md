# Smart ToDo API 📝

A RESTful backend system for task management with JWT authentication, built using clean architecture principles.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Authorization Logic](#authorization-logic)
- [Code Quality Highlights](#code-quality-highlights)

---

## 🎯 Overview

The **Smart ToDo API** is a RESTful backend that allows users to:
- **Register** and **login** securely
- **Create**, **read**, **update**, and **delete** their own tasks
- Manage tasks with **priority** levels and **status** tracking
- Access tasks with **pagination** support for scalability

Built from scratch following modular, well-documented, and easy to explain standards.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework for building REST APIs |
| **MongoDB** | NoSQL database for data persistence |
| **Mongoose** | ODM for MongoDB schema modeling |
| **JWT** (jsonwebtoken) | Stateless authentication |
| **bcryptjs** | Password hashing |
| **dotenv** | Environment variable management |
| **express-validator** | Request validation |

---

## 📁 Project Structure

```
ToDo/
├── src/
│   ├── config/              # Configuration files
│   │   ├── db.js           # MongoDB connection
│   │   └── env.js          # Environment variables
│   ├── models/             # Mongoose schemas
│   │   ├── User.js         # User model
│   │   └── Task.js         # Task model
│   ├── controllers/        # Request handlers
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── routes/             # Route definitions
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── middleware/         # Custom middleware
│   │   ├── auth.js         # JWT verification
│   │   ├── taskOwnership.js # Authorization
│   │   └── errorHandler.js  # Centralized error handling
│   ├── utils/              # Utility functions
│   │   ├── generateToken.js
│   │   └── validators.js
│   └── app.js              # Express app entry point
├── .env.example            # Environment template
├── .gitignore
├── package.json
└── README.md
```

### **Why This Structure?**

- Clear separation of concerns for maintainability and scalability

---

## ✨ Features

### **Authentication**
- ✅ User registration with unique username/email
- ✅ Secure password hashing with bcrypt (10 rounds)
- ✅ JWT token generation with configurable expiration
- ✅ Protected routes requiring valid authentication

### **Task Management**
- ✅ Create tasks with title, description, status, and priority
- ✅ Get all tasks for the authenticated user (paginated)
- ✅ Update tasks (owner only)
- ✅ Delete tasks (owner only)

### **Error Handling**
- ✅ Centralized error middleware
- ✅ Consistent JSON error responses
- ✅ Validation errors, duplicate keys, invalid IDs handled gracefully
- ✅ No stack traces exposed in production

### **Pagination**
- ✅ `GET /tasks` supports `?page=1&limit=10`
- ✅ Returns total count and pagination metadata

---

## 🚀 Installation

### **Prerequisites**
- Node.js (v14 or higher)
- MongoDB (local or cloud like MongoDB Atlas)
- Git

### **Steps**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ToDo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env with your configuration
   # For Windows: copy .env.example .env
   ```

4. **Configure your `.env` file**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/smart-todo
   JWT_SECRET=your_secure_random_string
   JWT_EXPIRE=24h
   ```

5. **Start the server**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Verify the server is running**
   ```
   Navigate to: http://localhost:5000
   Expected response:
   {
     "success": true,
     "message": "Smart ToDo API is running",
     "version": "1.0.0"
   }
   ```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/smart-todo` |
| `JWT_SECRET` | Secret key for JWT signing | Generate using: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` |
| `JWT_EXPIRE` | JWT token expiration time | `24h`, `7d`, `30m` |

### **MongoDB Setup**

**Option 1: Local MongoDB**
```
MONGODB_URI=mongodb://localhost:27017/smart-todo
```

**Option 2: MongoDB Atlas (Cloud)**
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/smart-todo
```

---

## 📡 API Endpoints

### **Base URL**: `http://localhost:5000`

### **Authentication Endpoints**

- 📬 A complete Postman collection with all requests and example responses is included in this repository for easy testing.


#### 1. Register User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201)**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "6576a1b2c3d4e5f6a7b8c9d0",
      "username": "john_doe",
      "email": "john@example.com",
      "createdAt": "2024-12-24T15:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 2. Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200)**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "6576a1b2c3d4e5f6a7b8c9d0",
      "username": "john_doe",
      "email": "john@example.com",
      "createdAt": "2024-12-24T15:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### **Task Endpoints** (All require authentication)

#### 3. Create Task
```http
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README",
  "status": "pending",
  "priority": "high"
}
```

**Success Response (201)**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "6576a2b3c4d5e6f7a8b9c0d1",
    "title": "Complete project documentation",
    "description": "Write comprehensive README",
    "status": "pending",
    "priority": "high",
    "owner": "6576a1b2c3d4e5f6a7b8c9d0",
    "createdAt": "2024-12-24T16:00:00.000Z"
  }
}
```

#### 4. Get All Tasks (Paginated)
```http
GET /tasks?page=1&limit=10
Authorization: Bearer <token>
```

**Success Response (200)**
```json
{
  "success": true,
  "count": 10,
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalTasks": 25,
    "limit": 10
  },
  "data": [
    {
      "_id": "6576a2b3c4d5e6f7a8b9c0d1",
      "title": "Complete project documentation",
      "description": "Write comprehensive README",
      "status": "pending",
      "priority": "high",
      "owner": "6576a1b2c3d4e5f6a7b8c9d0",
      "createdAt": "2024-12-24T16:00:00.000Z"
    }
  ]
}
```

#### 5. Update Task
```http
PUT /tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "completed"
}
```

**Success Response (200)**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "_id": "6576a2b3c4d5e6f7a8b9c0d1",
    "title": "Complete project documentation",
    "status": "completed",
    "priority": "high",
    "owner": "6576a1b2c3d4e5f6a7b8c9d0"
  }
}
```

#### 6. Delete Task
```http
DELETE /tasks/:id
Authorization: Bearer <token>
```

**Success Response (200)**
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {}
}
```

---

### **Error Responses**

#### Validation Error (400)
```json
{
  "success": false,
  "message": "Please provide a task title"
}
```

#### Unauthorized (401)
```json
{
  "success": false,
  "message": "Not authorized to access this route. Please provide a valid token."
}
```

---

## 🛡️ Authorization Logic

### **How Task Ownership Works**

1. **User creates a task**: The `owner` field is automatically set to the authenticated user's ID
2. **User tries to update/delete a task**:
   - `auth` middleware verifies the JWT token
   - `verifyTaskOwnership` middleware checks if the task exists
   - It compares `task.owner` with `req.user._id`
   - If they don't match → **403 Forbidden**
   - If they match → request proceeds to controller

### **Middleware Chain**
```javascript
router.put('/:id', 
  protect,                  // Step 1: Verify JWT
  verifyTaskOwnership,      // Step 2: Check ownership
  updateTaskValidation,     // Step 3: Validate input
  updateTask                // Step 4: Update task
);
```

---

## 💎 Code Quality Highlights

### **1. Modular Architecture**
- **Separation of concerns**: Routes → Controllers → Models
- **Reusable middleware**: Auth and ownership checks are DRY
- **Centralized configuration**: All env variables in one place

### **2. Security Best Practices**
- Passwords hashed with bcrypt (10 salt rounds)
- JWTs expire after configurable time
- Password field excluded from queries by default (`select: false`)
- No sensitive data in error messages

### **3. Error Handling**
- Single error handler for the entire app
- Mongoose errors (CastError, ValidationError, Duplicate Key) handled gracefully
- Consistent error response format

---