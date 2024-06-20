import { Navigate } from 'react-router-dom';
import useAuth from '@/lib/auth'; // ajuste o caminho conforme necessário

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Navigate to="/login" />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
