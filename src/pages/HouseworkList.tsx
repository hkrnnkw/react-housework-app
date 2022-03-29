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
import { useHouse } from '../contexts/houses'

const HouseworkList: React.FC = () => {
  const { currentHouse, houses } = useHouse()

  if (!currentHouse || !houses) return null
  const { housework } = houses[currentHouse.id]

  return (
    <StyledPaper>
      <Outlet />
      <List>
        {Object.entries(housework).map(([key, value]) => (
          <Link
            key={key}
            component={RouterLink}
            to={`${paths.settings}${paths.houseworkList}/${key}`}
            state={{ id: key }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText
                  id={key}
                  primary={value.title}
                  secondary={value.points}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </StyledPaper>
  )
}

export default HouseworkList
