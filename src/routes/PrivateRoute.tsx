import React, { ComponentType } from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '../contexts/user'
import paths from '../lib/path'

type RouteProps = {
  component: ComponentType
}

const PrivateRoute: React.FC<RouteProps> = ({ component: RouteComponent }) => {
  const { uid } = useUser()

  if (!uid.length) return <Navigate to={paths.home} />
  return <RouteComponent />
}

export default PrivateRoute
