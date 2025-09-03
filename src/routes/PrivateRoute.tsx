import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
  allowedRoles: string[];
}

const PrivateRoute: React.FC<Props> = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/login" />;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (!allowedRoles.includes(payload.role)) return <Navigate to="/login" />;
    return <>{children}</>;
  } catch {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
