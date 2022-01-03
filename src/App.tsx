import React from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter,
  Route,
  Routes,
  Link as RouterLink,
} from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { IconButton, Link, Toolbar } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { auth } from './firebase';
import { updateAuthStatus } from './stores/auth';
import paths from './utils/paths';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import StyledAppBar from './components/atoms/StyledAppBar';
import { AppUser } from './utils/types';
import PrivateRoute from './routes/PrivateRoute';
import Settings from './pages/Settings';
import HouseworkItem from './pages/HouseworkItem';
import HouseworkList from './pages/HouseworkList';

const App: React.FC = () => {
  const dispatch = useDispatch();

  // Firebase Authチェック（ログイン状態が変更されるたびに発火する）
  onAuthStateChanged(auth, (firebaseUser) => {
    if (!firebaseUser) {
      dispatch(updateAuthStatus(null));
      return;
    }
    const { uid, displayName, email, photoURL, refreshToken, emailVerified } =
      firebaseUser;
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
    <BrowserRouter>
      <div>
        <StyledAppBar position="fixed">
          <Toolbar>
            <div id="title">
              <Link component={RouterLink} to={paths.home} id="logo">
                Top
              </Link>
            </div>
            <IconButton aria-label="settings">
              <Link component={RouterLink} to={paths.settings}>
                <SettingsIcon />
              </Link>
            </IconButton>
          </Toolbar>
        </StyledAppBar>
        <Routes>
          <Route path={paths.home} element={<Home />} />
          <Route
            path={paths.settings}
            element={<PrivateRoute component={Settings} />}
          >
            <Route
              path={`${paths.settings}${paths.houseworkList}`}
              element={<PrivateRoute component={HouseworkList} />}
            >
              <Route
                path={`${paths.settings}${paths.houseworkList}:id`}
                element={<PrivateRoute component={HouseworkItem} />}
              />
            </Route>
          </Route>
          <Route element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
