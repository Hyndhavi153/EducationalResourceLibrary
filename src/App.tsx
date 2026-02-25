 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ResourceLibrary from './pages/ResourceLibrary';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const { user, login, logout, register } = useAuth();

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      <Router>
        <div className="app">
          {user && <Navigation />}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login isRegister />} />
            <Route
              path="/library"
              element={
                <ProtectedRoute>
                  <ResourceLibrary />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={user ? <Navigate to="/library" /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
