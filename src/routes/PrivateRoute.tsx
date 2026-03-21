import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export function PrivateRoute() {
  const { signed } = useContext(AuthContext);

  // Se não estiver logado, redireciona. Se estiver, renderiza a rota filha (Outlet)
  return signed ? <Outlet /> : <Navigate to="/login" />;
}