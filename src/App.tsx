import React from 'react';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter,
    Route,
    Routes,
    Link as RouterLink,
} from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { Link, Toolbar } from '@mui/material';
import { auth } from './firebase';
import { setSignInStatus } from './stores/auth';
import paths from './utils/paths';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import StyledPaper from './components/StyledPaper';
import StyledAppBar from './components/StyledAppBar';

const App: React.FC = () => {
    const dispatch = useDispatch();

    // Firebase Authチェック（ログイン状態が変更されるたびに発火する）
    onAuthStateChanged(auth, (firebaseUser) => {
        dispatch(setSignInStatus(firebaseUser !== null));
    });

    return (
        <BrowserRouter>
            <StyledPaper>
                <StyledAppBar position="fixed">
                    <Toolbar>
                        <div id="title">
                            <Link
                                component={RouterLink}
                                to={paths.home}
                                id="logo"
                            >
                                Top
                            </Link>
                        </div>
                    </Toolbar>
                </StyledAppBar>
                <Routes>
                    <Route path={paths.home} element={<Home />} />
                    <Route element={<NotFound />} />
                </Routes>
            </StyledPaper>
        </BrowserRouter>
    );
};

export default App;
