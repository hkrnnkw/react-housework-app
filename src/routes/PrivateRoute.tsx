import React, { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/index';
import paths from '../utils/paths';

type RouteProps = {
  component: ComponentType;
};

const PrivateRoute: React.FC<RouteProps> = ({ component: RouteComponent }) => {
  const { uid } = useSelector((rootState: RootState) => rootState.auth);

  if (!uid.length) return <Navigate to={paths.home} />;
  return <RouteComponent />;
};

export default PrivateRoute;
