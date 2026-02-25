import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import './Navigation.css';

const Navigation: React.FC = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          📚 Resource Library
        </Link>
        <div className="nav-menu">
          <Link to="/library" className="nav-link">
            Library
          </Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className="nav-link">
              Admin Dashboard
            </Link>
          )}
          <div className="user-info">
            <span className="username">{user?.username}</span>
            <span className="role-badge">{user?.role}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
