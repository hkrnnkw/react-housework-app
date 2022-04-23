import { FC } from 'react'
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  Link as RouterLink,
} from 'react-router-dom'
import { AppBar, IconButton, Link, Toolbar } from '@mui/material'
import { styled } from '@mui/material/styles'
import SettingsIcon from '@mui/icons-material/Settings'
import paths from './lib/path'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import PrivateRoute from './routes/PrivateRoute'
import Settings, { Index as SettingIndex } from './pages/Settings'
import HouseworkItem from './pages/HouseworkItem'
import HouseworkList, {
  Index as HouseworkListIndex,
} from './pages/HouseworkList'
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
        <Link component={RouterLink} to={paths.root} id="logo">
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

const Root: FC = () => (
  <>
    <Outlet />
    <StyledAppBar />
  </>
)

const App: FC = () => (
  <BrowserRouter>
    <Auth>
      <Routes>
        <Route path={paths.root} element={<Root />}>
          <Route index element={<Home />} />
          <Route
            path={paths.settings}
            element={<PrivateRoute component={Settings} />}
          >
            <Route index element={<SettingIndex />} />
            <Route
              path={`${paths.houseworkList}`}
              element={<PrivateRoute component={HouseworkList} />}
            >
              <Route index element={<HouseworkListIndex />} />
              <Route
                path=":id"
                element={<PrivateRoute component={HouseworkItem} />}
              />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Auth>
  </BrowserRouter>
)

export default App
