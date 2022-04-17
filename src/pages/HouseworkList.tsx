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
import { useHouse } from '../contexts/houses'

const HouseworkList: FC = () => {
  const { currentHouse, houses } = useHouse()

  if (!currentHouse || !houses) return null
  const { housework } = houses[currentHouse.id]

  return (
    <StyledPaper>
      <Outlet />
      <List>
        {Object.entries(housework).map(([categoryId, { taskDetails }]) => (
          <Link
            key={categoryId}
            component={RouterLink}
            to={`${paths.settings}${paths.houseworkList}/${categoryId}`}
            state={{ id: categoryId }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText
                  id={categoryId}
                  primary={taskDetails.title}
                  secondary={taskDetails.points}
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
