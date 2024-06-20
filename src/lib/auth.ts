import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  const toggleAuth = () => {
    setIsAuthenticated(prevAuth => !prevAuth);
  };

  return { isAuthenticated, toggleAuth };
};

export default useAuth;