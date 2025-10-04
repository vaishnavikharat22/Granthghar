import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import BookListPage from './pages/BookListPage';
import BookDetailsPage from './pages/BookDetailsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AddEditBookPage from './pages/AddEditBookPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-brand-cream font-sans">
        <Header />
        <main className="container mx-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<BookListPage />} />
            <Route path="/book/:id" element={<BookDetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/add-book" element={<AddEditBookPage />} />
            <Route path="/edit-book/:id" element={<AddEditBookPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

