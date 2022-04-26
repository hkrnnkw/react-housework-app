/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { Link as RouterLink, Outlet } from 'react-router-dom'
import {
  Fab,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { css } from '@emotion/react'
import { useHouse } from '../contexts/houses'

export const Index: FC = () => {
  const { currentHouse, houses } = useHouse()

  if (!currentHouse || !houses) return null
  const { housework } = houses[currentHouse.id]

  const handleAddTask = () => {
    console.log('add task')
  }

  return (
    <>
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
      <Fab color="primary" aria-label="add" css={fab} onClick={handleAddTask}>
        <AddIcon />
      </Fab>
    </>
  )
}

const HouseworkList: FC = () => <Outlet />

export default HouseworkList

const fab = css`
  position: fixed;
  bottom: 16px;
  right: 16px;
`
