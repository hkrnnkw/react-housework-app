import React from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
  Link as RouterLink,
} from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { IconButton, Link, Toolbar } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import { auth } from './firebase'
import paths from './utils/paths'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import StyledAppBar from './components/atoms/StyledAppBar'
import PrivateRoute from './routes/PrivateRoute'
import Settings from './pages/Settings'
import HouseworkItem from './pages/HouseworkItem'
import HouseworkList from './pages/HouseworkList'
import { useDispatchHouse, useHouse } from './contexts/houses'

const App: React.FC = () => {
  const { user } = useHouse()
  const { setUserData } = useDispatchHouse()

  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser?.uid === user?.uid) return
    setUserData(firebaseUser)
  })

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
  )
}

export default App
