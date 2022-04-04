import { FC } from 'react'
import { Button, Typography } from '@mui/material'
import StyledPaper from './atoms/StyledPaper'
import { useDispatchUser } from '../contexts/user'

export const Loading: FC = () => (
  <StyledPaper>
    <Typography>Loading...</Typography>
  </StyledPaper>
)

const SignIn: FC = () => {
  const { signIn } = useDispatchUser()

  return (
    <StyledPaper>
      <Button onClick={() => signIn()}>ログイン</Button>
    </StyledPaper>
  )
}

export default SignIn
