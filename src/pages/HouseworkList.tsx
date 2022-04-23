import { FC } from 'react'
import { Link as RouterLink, Outlet } from 'react-router-dom'
import {
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { useHouse } from '../contexts/houses'

export const Index: FC = () => {
  const { currentHouse, houses } = useHouse()

  if (!currentHouse || !houses) return null
  const { housework } = houses[currentHouse.id]

  return (
    <List>
      {Object.entries(housework).map(([categoryId, { taskDetails }]) =>
        Object.entries(taskDetails).map(([taskId, detail]) => {
          const id = `${categoryId}-${taskId}`
          return (
            <Link key={id} component={RouterLink} to={id} state={{ id }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText
                    id={id}
                    primary={detail.title}
                    secondary={detail.point}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          )
        })
      )}
    </List>
  )
}

const HouseworkList: FC = () => <Outlet />

export default HouseworkList
