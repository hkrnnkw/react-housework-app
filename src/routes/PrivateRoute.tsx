import React, { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/index';
import paths from '../utils/paths';

type RouteProps = {
  component: ComponentType;
};

const PrivateRoute: React.FC<RouteProps> = ({ component: RouteComponent }) => {
  const { user } = useSelector((rootState: RootState) => rootState.auth);

  if (!user) return <Navigate to={paths.home} />;
  return <RouteComponent />;
};

export default PrivateRoute;
