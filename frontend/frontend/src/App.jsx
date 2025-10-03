import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Components
import Header from './components/Header';

// Import Pages
import BookListPage from './pages/BookListPage';
import BookDetailsPage from './pages/BookDetailsPage';
import LoginPage from './pages/Loginpage';
import SignupPage from './pages/SignupPage';
import AddEditBookPage from './pages/AddEditBookPage';

function App() {
  return (
    // The Router component provides the routing context for the entire application
    <Router>
      <Header />
      <main className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
        {/* The Routes component is where you define individual routes */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<BookListPage />} />
          <Route path="/book/:id" element={<BookDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes (You would typically wrap these in a PrivateRoute component) */}
          <Route path="/add-book" element={<AddEditBookPage />} />
          <Route path="/edit-book/:id" element={<AddEditBookPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

