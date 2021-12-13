import React from 'react';
import { useSelector } from 'react-redux';
import SignIn from '../components/SignIn';
import { RootState } from '../stores';
import StyledPaper from '../components/atoms/StyledPaper';
import Calendar from '../components/Calendar';
import { AppUser } from '../utils/types';

const Home: React.FC = () => {
    const user: AppUser | null = useSelector(
        (rootState: RootState) => rootState.auth.user
    );

    if (!user) return <SignIn />;
    return (
        <StyledPaper>
            <Calendar uid={user.uid} />
        </StyledPaper>
    );
};

export default Home;
