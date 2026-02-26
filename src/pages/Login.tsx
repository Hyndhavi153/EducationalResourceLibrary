import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import './Login.css';

interface LoginProps {
  isRegister?: boolean;
}

const Login: React.FC<LoginProps> = ({ isRegister = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(isRegister);
  const { login, register } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

try {
  if (isRegisterMode) {
    if (!username || !email || !password) {
      setError('All fields are required');
      return;
    }

    await register(username, email, password);

    alert("Registration successful! 🎉");

  } else {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    await login(email, password);

    alert("Login successful! 🎉");
  }

  navigate('/library');

} catch (err: any) {
  setError(err.message || 'An error occurred');
}
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setError('');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>📚 Educational Resource Library</h1>
        <h2>{isRegisterMode ? 'Create Account' : 'Login'}</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {isRegisterMode && (
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn-submit">
            {isRegisterMode ? 'Register' : 'Login'}
          </button>
        </form>

        <div className="auth-toggle">
          <p>
            {isRegisterMode ? 'Already have an account?' : "Don't have an account?"}
            <button type="button" onClick={toggleMode} className="toggle-btn">
              {isRegisterMode ? 'Login' : 'Register'}
            </button>
          </p>
        </div>

        <div className="demo-info">
          <p><strong>Demo Credentials:</strong></p>
          <p>Email: admin@example.com</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
