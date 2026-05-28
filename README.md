# Leave Management System API

A production-ready TypeScript-based REST API for leave management with centralized response handling, JWT authentication, and MongoDB persistence.

## 🚀 Features

- **Express + TypeScript** - Type-safe backend with strict TypeScript configuration
- **JWT Authentication** - Secure Bearer token-based authentication with access & refresh tokens
- **Centralized Response Format** - Consistent API responses across all endpoints
- **MongoDB** - Document database with repository pattern for data access
- **Error Handling** - Global error handler with structured error responses
- **Security** - Helmet, CORS, rate limiting, and input validation
- **Logging** - Winston logger integration for debugging
- **API Documentation** - Swagger/OpenAPI specs at `/api-docs`
- **Code Quality** - ESLint & Prettier configured

## 📋 Prerequisites

- Node.js 16+ and npm/yarn
- MongoDB 4.0+
- `.env` file with required variables

## 🏗️ Project Structure

```
src/
├── app.ts                 # Express app setup & middleware
├── server.ts              # Server bootstrap
├── config/                # Configuration & logger setup
├── controllers/           # Request handlers (AuthController, UserController)
├── services/              # Business logic (AuthService, UserService)
├── repositories/          # Data access layer (UserRepository)
├── models/                # MongoDB schemas (User, RefreshToken)
├── routes/                # Express route definitions
├── middleware/            # Auth, error handling, security
├── utils/                 # Utilities (JWT, password hashing, API response)
├── types/                 # TypeScript type definitions
└── docs/                  # Swagger API documentation
```

## ⚙️ Environment Setup

Create a `.env` file in the root directory:

```env
# Server
NODE_ENV=development
PORT=4000

# Database
MONGO_URI=mongodb://localhost:27017
DATABASE_NAME=leave-management-system

# JWT Secrets (use strong, random values in production)
JWT_SECRET=your-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-key-here

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:4000`

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **View API documentation:**
   ```
   http://localhost:4000/api-docs
   ```

## 📡 API Response Format

All API responses follow a consistent structure:

### Success Response (2xx)
```json
{
  "success": true,
  "message": "Resource retrieved successfully",
  "code": "SUCCESS",
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "name": "User Name"
    }
  }
}
```

### Error Response (4xx, 5xx)
```json
{
  "success": false,
  "message": "Invalid credentials",
  "code": "UNAUTHORIZED",
  "errors": null
}
```

### Response Codes

- `SUCCESS` (200) - Request completed successfully
- `CREATED` (201) - Resource created successfully
- `BAD_REQUEST` (400) - Invalid request parameters
- `UNAUTHORIZED` (401) - Missing or invalid authentication
- `FORBIDDEN` (403) - Access denied
- `NOT_FOUND` (404) - Resource not found
- `CONFLICT` (409) - Resource conflict
- `VALIDATION_ERROR` (422) - Validation failed
- `INVALID_TOKEN` (401) - Invalid JWT token
- `TOKEN_EXPIRED` (401) - JWT token has expired
- `SERVER_ERROR` (500) - Internal server error

## 🔐 Authentication

### 1. Register User
```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "code": "CREATED",
  "data": {
    "user": {
      "_id": "user_id",
      "email": "john@example.com",
      "name": "John Doe",
      "role": "EMPLOYEE"
    }
  }
}
```

### 2. Login
```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "code": "SUCCESS",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "_id": "user_id",
      "email": "john@example.com",
      "name": "John Doe",
      "role": "EMPLOYEE"
    }
  }
}
```

### 3. Get Profile
```bash
GET /api/v1/user/get-profile
Authorization: Bearer {accessToken}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "code": "SUCCESS",
  "data": {
    "user": {
      "id": "user_id",
      "email": "john@example.com",
      "name": "John Doe",
      "provider": "local"
    }
  }
}
```

## 🔑 Bearer Token Usage

All protected endpoints require the `Authorization` header with a Bearer token:

```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  http://localhost:4000/api/v1/user/get-profile
```

## 📝 Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Start development server with auto-reload
- `npm start` - Start production server
- `npm run lint` - Fix ESLint issues
- `npm run lint:check` - Check ESLint issues without fixing

## 🛡️ Security Features

- **CORS** - Cross-origin resource sharing configured
- **Helmet** - Sets security HTTP headers
- **Rate Limiting** - Prevents brute force attacks
- **JWT** - Secure token-based authentication
- **Password Hashing** - bcrypt for secure password storage
- **Input Validation** - Express validator integration

## 🔍 Troubleshooting

### "secretOrPrivateKey must have a value"
- Ensure `JWT_SECRET` is set in `.env`
- JWT secret should not be empty or undefined

### "Unauthorized - Missing or invalid Bearer token"
- Include `Authorization: Bearer <token>` in request headers
- Token must start with "Bearer " prefix
- Token must be valid and not expired

### MongoDB Connection Error
- Verify MongoDB is running
- Check `MONGO_URI` in `.env`
- Ensure database name matches `DATABASE_NAME` in config

## 📚 Additional Resources

- [Express Documentation](https://expressjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [MongoDB Guide](https://docs.mongodb.com/)
- [JWT.io](https://jwt.io/) - JWT token debugger

## 📄 License

Private project - All rights reserved
