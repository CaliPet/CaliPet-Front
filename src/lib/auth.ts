import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [data] = useState(
    () => {
      return JSON.parse(localStorage.getItem("user") || "{}");
    }
  )

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  const toggleAuth = () => {
    setIsAuthenticated(prevAuth => !prevAuth);  
    
    window.location.reload();
  };

  return { isAuthenticated, toggleAuth, data };
};

export default useAuth;
