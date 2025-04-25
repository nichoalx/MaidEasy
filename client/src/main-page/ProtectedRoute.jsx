import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login');
      } else if (allowedRoles.length > 0 && !allowedRoles.includes(user.type_of_user)) {
        navigate('/unauthorized');
      }
    }
  }, [user, loading, allowedRoles]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.type_of_user)) return null;

  return <Outlet />;
};