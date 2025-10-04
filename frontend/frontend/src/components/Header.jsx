import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">ग्रंथghar</Link>
        <nav className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="font-semibold">Hello, {user.name}</span>
              <Link to="/add-book" className="bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded">Add Book</Link>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/signup" className="hover:text-gray-300">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
