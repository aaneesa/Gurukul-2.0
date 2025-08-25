# Gurukul AI Backend

This is the Express.js backend for the Gurukul AI application, handling user authentication and redirect logic.

## Features

- **User Management**: MongoDB-based user system with Clerk integration
- **Smart Redirects**: Tracks user visits and redirects new users to practice page
- **Authentication**: Integrates with Clerk for secure user authentication
- **RESTful API**: Clean API endpoints for frontend integration

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Variables

Create a `.env` file in the backend directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/gurukul

# Server Configuration
PORT=5000

# Environment
NODE_ENV=development
```

### 3. Start MongoDB

Make sure MongoDB is running on your system.

### 4. Run the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication Routes

- `POST /api/auth/check-redirect` - Check if user should be redirected
- `POST /api/auth/clear-redirect` - Clear user's redirect status
- `POST /api/auth/sync-user` - Sync user data with Clerk

### Health Check

- `GET /api/health` - Server health status

## Database Schema

### User Model

```javascript
{
  email: String (required, unique),
  name: String (required),
  clerkUserId: String (unique, sparse),
  hasVisited: Boolean (default: false),
  firstSignUp: Date (default: now),
  lastVisit: Date (default: now),
  timestamps: true
}
```

## Integration with Frontend

The frontend (Next.js) communicates with this backend through the `/api/auth/*` endpoints. The redirect logic ensures that:

1. **New users** are redirected to the practice page after signup
2. **Existing users** can navigate freely to any page
3. **Sign out** resets the redirect status for next login

## Development

- Uses `nodemon` for auto-reload during development
- CORS enabled for frontend communication
- Error handling middleware included
- MongoDB connection with proper error handling

## Production

- Set `NODE_ENV=production` in production
- Use proper MongoDB connection string
- Consider using PM2 or similar process manager
- Enable proper logging and monitoring
