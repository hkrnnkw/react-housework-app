import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { Button } from '@mui/material';
import StyledPaper from './atoms/StyledPaper';

const SignUp: React.FC = () => {
  const provider = new GoogleAuthProvider();

  const handleSignUp = async () => {
    const auth = getAuth();
    await signInWithRedirect(auth, provider);
  };

  return (
    <StyledPaper>
      <Button onClick={() => handleSignUp()}>ログイン</Button>
    </StyledPaper>
  );
};

export default SignUp;
