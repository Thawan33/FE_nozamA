import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export function AdminRoute() {
  const { user, signed } = useContext(AuthContext);

  if (!signed) return <Navigate to="/" />;
  
  return user?.role === 'ADMIN' ? <Outlet /> : <Navigate to="/" />;
}