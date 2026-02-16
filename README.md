"# Granthghar

A book review and management application with a modern web interface. Granthghar allows users to explore books, read reviews, and manage their book collection.

## Features

- **User Authentication**: Sign up and login functionality
- **Book Management**: Add, edit, and view books
- **Book Reviews**: Read and write reviews for books
- **Book Ratings**: View rating charts and statistics for books
- **Pagination**: Browse books with easy pagination
- **Responsive Design**: Works on all devices

## Project Structure

```
Granthghar/
├── backend/                 # Node.js/Express API server
│   ├── config/             # Database configuration
│   ├── controllers/        # Business logic (auth, books, reviews)
│   ├── middleware/         # Custom middleware (authentication)
│   ├── models/             # Database models (User, Book, Review)
│   ├── routes/             # API routes
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
│
└── frontend/               # React + Vite frontend
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── pages/          # Page components
    │   ├── context/        # Authentication context
    │   ├── api/            # API integration (Axios)
    │   └── main.jsx        # Entry point
    ├── package.json        # Frontend dependencies
    └── vite.config.js      # Vite configuration

```

## Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB (database)

**Frontend:**
- React
- Vite
- Tailwind CSS
- Axios

## Getting Started

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:5000` (or configured port)

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## API Endpoints

- **Auth**: `/api/auth/signup`, `/api/auth/login`
- **Books**: `/api/books` (CRUD operations)
- **Reviews**: `/api/reviews` (CRUD operations)

## Environment Variables

Create a `.env` file in the backend folder with:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 5000)

## License

This project is open source and available for educational purposes." 
