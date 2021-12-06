import React from 'react';
import { useSelector } from 'react-redux';
import SignIn from './SignIn';
import { RootState } from '../stores';
import StyledPaper from '../components/StyledPaper';

const Home: React.FC = () => {
    const { signedIn } = useSelector((rootState: RootState) => rootState.auth);
    if (!signedIn) return <SignIn />;

    return (
        <StyledPaper>
            <></>
        </StyledPaper>
    );
};

export default Home;
