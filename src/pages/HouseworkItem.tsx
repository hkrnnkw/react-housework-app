import { FC } from 'react'
import { useLocation } from 'react-router-dom'

const HouseworkItem: FC = () => {
  const { id } = useLocation().state as { id: string }

  return <p>{id}</p>
}

export default HouseworkItem
