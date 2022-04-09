import { FC, useEffect, useState } from 'react'
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
import CustomDrawer from '../components/CustomDrawer/index'
import { HouseworkDetail } from '../lib/type'

const Home: FC = () => {
  const [editingHw, setEditingHw] = useState<HouseworkDetail | null>(null)
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
  const member = editingHw?.memberId ? members[editingHw.memberId] : null

  const makeId = (categoryId: string, houseworkId: string) =>
    `${categoryId}-${houseworkId}`

  const toggleDrawer = (
    categoryId: string | null,
    houseworkId: string | null
  ) => {
    if (categoryId && houseworkId) {
      const id = makeId(categoryId, houseworkId)
      setEditingHw(housework[id])
      return
    }
    setEditingHw(null)
  }

  const handleTaskComplete = async (
    categoryId: string,
    houseworkId: string,
    prevStatus: boolean
  ) => {
    await switchTaskStatus(uid, categoryId, houseworkId, prevStatus)
  }

  return (
    <StyledPaper>
      <List>
        {tasks.map(
          ({ categoryId, houseworkId, memberId, isCompleted = false }, i) => {
            const id = makeId(categoryId, houseworkId)
            const key = `${id}-${i}`
            return (
              <ListItem
                key={key}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="more"
                    onClick={() => toggleDrawer(categoryId, houseworkId)}
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
                  onClick={() =>
                    handleTaskComplete(categoryId, houseworkId, isCompleted)
                  }
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={isCompleted}
                      inputProps={{ 'aria-labelledby': key }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={id}
                    primary={housework[id].title}
                    secondary={
                      memberId ? members[memberId].displayName ?? '' : ''
                    }
                  />
                </ListItemButton>
              </ListItem>
            )
          }
        )}
      </List>
      {editingHw !== null && (
        <CustomDrawer
          member={member}
          housework={editingHw}
          toggleDrawer={toggleDrawer}
        />
      )}
    </StyledPaper>
  )
}

export default Home
