import { FC } from 'react'
import { Link as RouterLink, Outlet } from 'react-router-dom'
import {
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import StyledPaper from '../components/atoms/StyledPaper'
import paths from '../lib/path'
import { useDispatchUser } from '../contexts/user'

export const Index: FC = () => {
  const { signOut } = useDispatchUser()

  return (
    <List>
      <ListItem key="housework">
        <Link component={RouterLink} to={`${paths.houseworkList}`}>
          <ListItemButton>
            <ListItemText primary="家事を登録する" />
          </ListItemButton>
        </Link>
      </ListItem>
      <ListItem key="signOut">
        <Link component={RouterLink} to={`${paths.root}`}>
          <ListItemButton onClick={() => signOut()}>
            <ListItemText primary="ログアウト" />
          </ListItemButton>
        </Link>
      </ListItem>
    </List>
  )
}

const Settings: FC = () => (
  <StyledPaper>
    <Outlet />
  </StyledPaper>
)

export default Settings
