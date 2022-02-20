import React from 'react'
import { useLocation } from 'react-router-dom'
import StyledPaper from '../components/atoms/StyledPaper'
import { useHouse } from '../contexts/houses'

const HouseworkItem: React.FC = () => {
  const { id } = useLocation().state as { id: string }
  const { currentHouse } = useHouse()

  if (!currentHouse) return null
  return (
    <StyledPaper>
      <p>{id}</p>
    </StyledPaper>
  )
}

export default HouseworkItem
