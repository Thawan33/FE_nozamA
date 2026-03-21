import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export function AdminRoute() {
  const { user, signed } = useContext(AuthContext);

  if (!signed) return <Navigate to="/login" />;
  
  // Se estiver logado mas não for ADMIN, manda para a Home
  return user?.role === 'ADMIN' ? <Outlet /> : <Navigate to="/" />;
}