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

const HouseworkList: React.FC = () => {
  const { currentHouseId, houses } = useHouse();

  if (!currentHouseId) return null;
  return (
    <StyledPaper>
      <Outlet />
      <List>
        {Object.entries(houses[currentHouseId].housework).map(
          ([key, value]) => (
            <ListItem key={key}>
              <Link
                component={RouterLink}
                to={`${paths.settings}${paths.houseworkList}/${key}`}
                state={{ id: key }}
              >
                <ListItemButton>
                  <ListItemText
                    primary={value.description}
                    secondary={value.points}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          )
        )}
      </List>
    </StyledPaper>
  );
};

export default HouseworkList;
