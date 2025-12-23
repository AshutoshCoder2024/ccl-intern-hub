import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem('userToken');
  
  if (!token) {
    return <Navigate to="/user-login" replace />;
  }
  
  return <>{children}</>;
};

