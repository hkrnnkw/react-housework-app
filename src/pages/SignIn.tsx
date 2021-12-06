import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FirebaseError } from 'firebase/app';
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    UserCredential,
} from 'firebase/auth';
import { Button, TextField } from '@mui/material';
import { updateAuthStatus } from '../stores/auth';
import { AppUser } from '../utils/types';

const SignUp: React.FC = () => {
    const dispatch = useDispatch();
    const emailInput = useRef<string>('');
    const passwordInput = useRef<string>('');

    const setUserToStore = (userCredential: UserCredential) => {
        const {
            uid,
            displayName,
            email,
            photoURL,
            refreshToken,
            emailVerified,
        } = userCredential.user;
        const user: AppUser = {
            uid,
            displayName: displayName ?? '',
            email: email ?? emailInput.current,
            photoURL,
            refreshToken,
            emailVerified,
        };
        dispatch(updateAuthStatus(user));
    };

    const handleSignUp = async () => {
        const auth = getAuth();
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                emailInput.current,
                passwordInput.current
            );
            setUserToStore(userCredential);
        } catch (error) {
            const errorCode = (error as FirebaseError).code;
            console.error(errorCode); // eslint-disable-line no-console
            const errorMessge = (error as FirebaseError).message;
            console.error(errorMessge); // eslint-disable-line no-console
            if (errorCode === 'auth/user-not-found') {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    emailInput.current,
                    passwordInput.current
                );
                setUserToStore(userCredential);
            }
        }
    };

    return (
        <div className="SignIn">
            <TextField
                required
                id="outlined-email"
                label="メールアドレス"
                onChange={(event) => {
                    emailInput.current = event.target.value;
                }}
            />
            <TextField
                required
                id="outlined-password-input"
                label="パスワード"
                type="password"
                autoComplete="current-password"
                onChange={(event) => {
                    passwordInput.current = event.target.value;
                }}
            />
            <Button onClick={() => handleSignUp()}>ログイン</Button>
        </div>
    );
};

export default SignUp;
