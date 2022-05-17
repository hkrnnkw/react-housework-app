import { FC } from 'react'
import { Button, Typography } from '@mui/material'
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import { auth } from '../firebase'
import StyledPaper from './atoms/StyledPaper'

export const Loading: FC = () => (
  <StyledPaper>
    <Typography>Loading...</Typography>
  </StyledPaper>
)

const SignIn: FC = () => {
  const signIn = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithRedirect(auth, provider)
  }

  return (
    <StyledPaper>
      <Button onClick={() => signIn()}>ログイン</Button>
    </StyledPaper>
  )
}

export default SignIn
