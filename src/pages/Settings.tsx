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
import paths from '../utils/paths'
import { useDispatchHouse } from '../contexts/houses'

const Settings: React.FC = () => {
  const { signOut } = useDispatchHouse()

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
          <ListItemButton onClick={() => signOut()}>
            <ListItemText primary="ログアウト" />
          </ListItemButton>
        </ListItem>
      </List>
    </StyledPaper>
  )
}

export default Settings
