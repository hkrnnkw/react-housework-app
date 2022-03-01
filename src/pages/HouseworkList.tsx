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
import { useHouse } from '../contexts/houses'

const HouseworkList: React.FC = () => {
  const { currentHouse } = useHouse()

  if (!currentHouse) return null
  return (
    <StyledPaper>
      <Outlet />
      <List>
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
        {Object.entries(currentHouse.housework).map(([key, value]) => (
      </List>
    </StyledPaper>
  )
}

export default HouseworkList
