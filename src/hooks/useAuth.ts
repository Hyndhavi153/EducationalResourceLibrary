import { useState, useCallback, useEffect } from 'react';
import { User } from '../context/AuthContext';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  });

  // Initialize demo users if not exists
  useEffect(() => {
    if (!localStorage.getItem('users')) {
      const demoUsers = [
        {
          id: '1',
          username: 'admin',
          email: 'admin@example.com',
          password: 'admin123',
          role: 'admin'
        },
        {
          id: '2',
          username: 'student',
          email: 'student@example.com',
          password: 'student123',
          role: 'user'
        }
      ];
      localStorage.setItem('users', JSON.stringify(demoUsers));
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      // Mock login - in production, this would call an API
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Invalid credentials');
      }

      const userData = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        role: foundUser.role
      };

      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
    } catch (error) {
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('currentUser');
  }, []);

  const register = useCallback(async (username: string, email: string, password: string) => {
    try {
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.some((u: any) => u.email === email)) {
        throw new Error('User already exists');
      }

      const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password,
        role: 'user' as const
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Auto-login after registration
      const userData = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      };

      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
    } catch (error) {
      throw error;
    }
  }, []);

  return { user, login, logout, register };
};
