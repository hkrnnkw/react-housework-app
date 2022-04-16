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
import { State as UserState } from '../contexts/user/constants'

const makeId = (categoryId: string, taskId: string) => `${categoryId}-${taskId}`

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

  const getMember = (memberId: string | null): UserState | null => {
    if (!memberId) return null
    return members[memberId] ?? null
  }

  const toggleDrawer = (categoryId: string | null, taskId: string | null) => {
    if (categoryId && taskId) {
      const id = makeId(categoryId, taskId)
      setEditingHwId(id)
      return
    }
    setEditingHwId(null)
  }

  const handleTaskComplete = async (
    categoryId: string,
    taskId: string,
    prevStatus: boolean
  ) => {
    await switchTaskStatus(uid, categoryId, taskId, prevStatus)
  }

  return (
    <StyledPaper>
      <List>
        {tasks.map(
          ({ categoryId, taskId, memberId, isCompleted = false }, i) => {
            const id = makeId(categoryId, taskId)
            const key = `${id}-${i}`
            return (
              <ListItem
                key={key}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="more"
                    onClick={() => toggleDrawer(categoryId, taskId)}
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
                    handleTaskComplete(categoryId, taskId, isCompleted)
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
                    secondary={getMember(memberId)?.displayName ?? ''}
                  />
                </ListItemButton>
              </ListItem>
            )
          }
        )}
      </List>
      {editingHwId !== null && (
        <CustomDrawer
          member={getMember(housework[editingHwId].memberId)}
          housework={housework[editingHwId]}
          toggleDrawer={toggleDrawer}
        />
      )}
    </StyledPaper>
  )
}

export default Home
