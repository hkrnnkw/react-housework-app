import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import StyledPaper from '../components/atoms/StyledPaper'

const HouseworkItem: FC = () => {
  const { id } = useLocation().state as { id: string }

  return (
    <StyledPaper>
      <p>{id}</p>
    </StyledPaper>
  )
}

export default HouseworkItem
