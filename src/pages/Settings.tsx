import React from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import {
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import StyledPaper from '../components/atoms/StyledPaper';
import paths from '../utils/paths';
import { useHouse } from '../contexts/houses';

const Settings: React.FC = () => {
  const { currentHouse } = useHouse();

  if (!currentHouse) return null;
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
      </List>
    </StyledPaper>
  );
};

export default Settings;
