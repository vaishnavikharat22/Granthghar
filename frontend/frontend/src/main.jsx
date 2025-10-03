import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// Import the AuthProvider to make authentication context available to the whole app
import { AuthProvider } from './context/AuthContext.jsx';

// This is the root of your React application
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode helps identify potential problems in an application
  <React.StrictMode>
    {/* By wrapping App with AuthProvider, all components inside App can access the user state */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

