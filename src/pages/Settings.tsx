import React from 'react'
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

const Settings: React.FC = () => {
  const { signOut } = useDispatchUser()

  return (
    <StyledPaper>
      <Outlet />
      <List>
        <ListItem key="housework">
          <Link
            component={RouterLink}
            to={`${paths.settings}${paths.houseworkList}`}
          >
            <ListItemButton>
              <ListItemText primary="家事を登録する" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key="signOut">
          <Link component={RouterLink} to={`${paths.home}`}>
            <ListItemButton onClick={() => signOut()}>
              <ListItemText primary="ログアウト" />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </StyledPaper>
  )
}

export default Settings
