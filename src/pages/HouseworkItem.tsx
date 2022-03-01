import React from 'react'
import { useLocation } from 'react-router-dom'
import StyledPaper from '../components/atoms/StyledPaper'

const HouseworkItem: React.FC = () => {
  const { id } = useLocation().state as { id: string }

  return (
    <StyledPaper>
      <p>{id}</p>
    </StyledPaper>
  )
}

export default HouseworkItem
