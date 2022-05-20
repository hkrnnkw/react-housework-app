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
import { useUser } from '../lib/hooks/store/currentUser'
import StyledPaper from '../components/atoms/StyledPaper'
import CustomDrawer from '../components/CustomDrawer/index'
import { CategoryId, Editing, HouseworkId, Member, TaskId } from '../lib/type'
import { sortTasks } from '../handlers/logsHandler'
import { EDITING_STATUS_ENUM } from '../lib/constant'

const Home: FC = () => {
  const [editing, setEditing] = useState<Editing | null>(null)
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
  const tasks = sortTasks([...(logs[currentDate] ?? [])])

  const getMember = (memberId: string | null): Member | null => {
    if (!memberId) return null
    return members[memberId] ?? null
  }

  const handleTaskComplete = async (
    categoryId: CategoryId,
    taskId: TaskId,
    prevStatus: boolean
  ) => {
    await switchTaskStatus(uid, categoryId, taskId, prevStatus)
  }

  const handleEdit = (houseworkId: HouseworkId) => {
    setEditing({ houseworkId, editingStatus: EDITING_STATUS_ENUM.SAVE })
  }

  return (
    <StyledPaper>
      <List>
        {tasks.map(({ categoryId, taskId, memberId, isCompleted }, i) => {
          const key = `${categoryId}-${taskId}-${i}`
          return (
            <ListItem
              key={key}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="more"
                  onClick={() => handleEdit({ categoryId, taskId })}
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
                  id={key}
                  primary={housework[categoryId].taskDetails[taskId]?.title}
                  secondary={getMember(memberId)?.displayName ?? ''}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
      <CustomDrawer
        editing={editing}
        members={Object.values(members)}
        housework={housework}
        setEditing={setEditing}
      />
    </StyledPaper>
  )
}

export default Home
