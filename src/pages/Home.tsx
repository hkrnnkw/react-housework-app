import React from 'react';
import { useSelector } from 'react-redux';
import SignIn from '../components/SignIn';
import { RootState } from '../stores';
import Calendar from '../components/Calendar';
import { AppUser } from '../utils/types';

const Home: React.FC = () => {
    const user: AppUser | null = useSelector(
        (rootState: RootState) => rootState.auth.user
    );

    return !user ? <SignIn /> : <Calendar uid={user.uid} />;
};

export default Home;
