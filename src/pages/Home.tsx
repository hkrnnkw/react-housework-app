import React from 'react';
import { useSelector } from 'react-redux';
import SignIn from '../components/SignIn';
import { RootState } from '../stores';
import StyledPaper from '../components/atoms/StyledPaper';
import Calendar from '../components/Calendar';

const Home: React.FC = () => {
    const { signedIn } = useSelector((rootState: RootState) => rootState.auth);
    if (!signedIn) return <SignIn />;

    return (
        <StyledPaper>
            <Calendar />
        </StyledPaper>
    );
};

export default Home;
