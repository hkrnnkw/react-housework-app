import { FC } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Link } from '@mui/material'
import { useHouses } from '../lib/hooks/store/houses'
import { useUser } from '../lib/hooks/store/currentUser'
import paths from '../lib/path'

const PointDisplay: FC = () => {
  const { members } = useHouses()
  const { uid } = useUser()
  const { pathname } = useLocation()
  if (!members) return null

  const monthlyPoints = members[uid].monthlyPoints ?? 0
  const { root } = paths
  const label = pathname === root ? `${monthlyPoints} pt` : 'Top'
  // todo
  const path = pathname === root ? root : root

  return (
    <div id="title">
      <Link component={RouterLink} to={path} id="logo">
        {label}
      </Link>
    </div>
  )
}

export default PointDisplay
