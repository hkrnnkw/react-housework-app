import React from 'react'
import { Button } from '@mui/material'
import StyledPaper from './atoms/StyledPaper'
import { useDispatchHouse } from '../contexts/houses'

const SignIn: React.FC = () => {
  const { signIn } = useDispatchHouse()

  return (
    <StyledPaper>
      <Button onClick={() => signIn()}>ログイン</Button>
    </StyledPaper>
  )
}

export default SignIn
