import React from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { clearAuthStatus, updateAuthStatus } from './stores/auth';
import SignUp from './routes/SignUp';
import { AppUser } from './utils/interfaces';

const App: React.FC = () => {
    const dispatch = useDispatch();

    // Firebase Authチェック（ログイン状態が変更されるたびに発火する）
    onAuthStateChanged(auth, (firebaseUser) => {
        if (!firebaseUser) {
            dispatch(clearAuthStatus());
            return;
        }
        const {
            uid,
            displayName,
            email,
            photoURL,
            refreshToken,
            emailVerified,
        } = firebaseUser;
        const user: AppUser = {
            uid,
            displayName: displayName ?? '',
            email: email ?? '',
            photoURL,
            refreshToken,
            emailVerified,
        };
        dispatch(updateAuthStatus(user));
    });

    return (
        <div className="App">
            <SignUp />
        </div>
    );
};

export default App;
