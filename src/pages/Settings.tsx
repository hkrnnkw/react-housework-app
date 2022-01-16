import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import {
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { RootState } from '../stores';
import StyledPaper from '../components/atoms/StyledPaper';
import paths from '../utils/paths';

const Settings: React.FC = () => {
  const { currentHouse } = useSelector(
    (rootState: RootState) => rootState.houses
  );

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
