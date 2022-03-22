import React, { FC, useEffect, useState } from 'react'
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useDispatchHouse, useHouse } from '../contexts/houses'
import { useUser } from '../contexts/user'
import StyledPaper from '../components/atoms/StyledPaper'
import CustomDrawer from '../components/CustomDrawer'

const Home: FC = () => {
  const [editingHwId, setEditingHwId] = useState<string | null>(null)
  const { uid } = useUser()
  const { initHouses, switchTaskStatus } = useDispatchHouse()
  const { currentDate, currentHouse, houses } = useHouse()

  useEffect(() => {
    if (!uid.length) return
    // eslint-disable-next-line no-console
    initHouses(uid).catch((e) => console.error(e))
  }, [initHouses, uid])

  if (!currentHouse || !houses) return null
  const { id: currentHouseId, members } = currentHouse
  const { logs, housework } = houses[currentHouseId]
  const tasks = [...(logs[currentDate] ?? [])]

  const toggleDrawer = (houseworkId: string | null) => {
    setEditingHwId(houseworkId)
  }

  const handleTaskComplete = async (id: string, prevStatus: boolean) => {
    await switchTaskStatus(uid, id, prevStatus)
  }

  return (
    <StyledPaper>
      <List>
        {tasks.map((task, i) => {
          const { houseworkId, memberId, isCompleted = false } = task
          return (
            <ListItem
              // eslint-disable-next-line react/no-array-index-key
              key={`${houseworkId}-${i}`}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="more"
                  onClick={() => toggleDrawer(houseworkId)}
                >
                  <MoreHorizIcon />
                </IconButton>
              }
              disablePadding
              style={{
                backgroundColor: memberId === uid ? '#DDDDFF' : '#FFFFFF',
              }}
            >
              <ListItemButton
                onClick={() => handleTaskComplete(houseworkId, isCompleted)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={isCompleted}
                    inputProps={{ 'aria-labelledby': houseworkId }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={houseworkId}
                  primary={housework[houseworkId].title}
                  secondary={
                    memberId ? members[memberId].displayName ?? '' : ''
                  }
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
      <CustomDrawer houseworkId={editingHwId} toggleDrawer={toggleDrawer} />
    </StyledPaper>
  )
}

export default Home
