import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FirebaseError } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Button, TextField } from '@mui/material';
import { updateAuthStatus } from '../stores/auth';
import { AppUser } from '../utils/interfaces';

const SignUp: React.FC = () => {
    const dispatch = useDispatch();
    const emailInput = useRef<string>('');
    const password = useRef<string>('');

    const init = async () => {
        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                emailInput.current,
                password.current
            );
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
                email: email ?? '',
                photoURL,
                refreshToken,
                emailVerified,
            };
            dispatch(updateAuthStatus(user));
        } catch (error) {
            const errorCode = (error as FirebaseError).code;
            console.error(errorCode); // eslint-disable-line no-console
        }
    };

    return (
        <div className="SignUp">
            <TextField
                required
                id="outlined-email"
                label="Email"
                onChange={(event) => {
                    emailInput.current = event.target.value;
                }}
            />
            <TextField
                required
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={(event) => {
                    password.current = event.target.value;
                }}
            />
            <Button onClick={() => init()}>登録</Button>
        </div>
    );
};

export default SignUp;
