
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';

const AuthWrapper: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);

  const toggleForm = () => {
    setIsLoginMode(!isLoginMode);
  };

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return isLoginMode ? (
    <Login onToggleForm={toggleForm} />
  ) : (
    <Register onToggleForm={toggleForm} />
  );
};

export default AuthWrapper;
