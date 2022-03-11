import React, { FC } from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
  Link as RouterLink,
} from 'react-router-dom'
import { AppBar, IconButton, Link, Toolbar } from '@mui/material'
import { styled } from '@mui/material/styles'
import SettingsIcon from '@mui/icons-material/Settings'
import paths from './utils/paths'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import PrivateRoute from './routes/PrivateRoute'
import Settings from './pages/Settings'
import HouseworkItem from './pages/HouseworkItem'
import HouseworkList from './pages/HouseworkList'
import SignIn, { Loading } from './components/SignIn'
import DateDisplay from './components/DateDisplay'
import { useDispatchUser, useUser } from './contexts/user'

const AppBarStyle = styled(AppBar)(({ theme }) => ({
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.default,
  '& div.MuiToolbar-regular': {
    width: `calc(100% - ${theme.spacing(4)}px)`,
    minHeight: '44px',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 2),
  },
}))

const StyledAppBar: FC = (): JSX.Element => (
  <AppBarStyle position="fixed">
    <Toolbar>
      <div id="title">
        <Link component={RouterLink} to={paths.home} id="logo">
          Top
        </Link>
      </div>
      <DateDisplay />
      <IconButton aria-label="settings">
        <Link component={RouterLink} to={paths.settings}>
          <SettingsIcon />
        </Link>
      </IconButton>
    </Toolbar>
  </AppBarStyle>
)

type Props = {
  children: JSX.Element
}

const Auth: FC<Props> = ({ children }): JSX.Element => {
  const { uid } = useUser()
  const { useAuth } = useDispatchUser()
  const isLoading = useAuth()
  if (!uid.length) return <SignIn />
  if (isLoading) return <Loading />
  return children
}

const App: FC = () => (
  <BrowserRouter>
    <div>
      <StyledAppBar />
      <Auth>
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
      </Auth>
    </div>
  </BrowserRouter>
)

export default App
