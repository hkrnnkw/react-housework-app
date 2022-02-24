import React, { FC } from 'react'
import { Button, Typography } from '@mui/material'
import StyledPaper from './atoms/StyledPaper'
import { useDispatchHouse } from '../contexts/houses'

export const Loading: FC = () => (
  <StyledPaper>
    <Typography>Loading...</Typography>
  </StyledPaper>
)

const SignIn: FC = () => {
  const { signIn } = useDispatchHouse()

  return (
    <StyledPaper>
      <Button onClick={() => signIn()}>ログイン</Button>
    </StyledPaper>
  )
}

export default SignIn
