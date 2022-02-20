import React, { ComponentType } from 'react'
import { Navigate } from 'react-router-dom'
import { useHouse } from '../contexts/houses'
import paths from '../utils/paths'

type RouteProps = {
  component: ComponentType
}

const PrivateRoute: React.FC<RouteProps> = ({ component: RouteComponent }) => {
  const { user } = useHouse()

  if (!user) return <Navigate to={paths.home} />
  return <RouteComponent />
}

export default PrivateRoute
