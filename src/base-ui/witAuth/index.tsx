import { useAuth } from '@/context';
import React, { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return (props: P) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
