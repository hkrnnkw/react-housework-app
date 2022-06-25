import { FC, useEffect, useRef, useState } from 'react'
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
import { useDispatchHouses, useHouses } from '../../lib/hooks/store/houses'
import { useUser } from '../../lib/hooks/store/currentUser'
import StyledPaper from '../../components/atoms/StyledPaper'
import CustomDrawer from '../../components/CustomDrawer/index'
import {
  CategoryId,
  Editing,
  House,
  HouseworkId,
  Member,
  TaskId,
} from '../../lib/type'
import { sortTasks } from '../../handlers/logsHandler'
import { EDITING_STATUS_ENUM } from '../../lib/constant'
import { useDate } from '../../lib/hooks/store/currentDate'
import { setLogToFirestore } from '../../handlers/firestoreHandler'

const Home: FC = () => {
  /** todo: remove below for production */
  const didLogRef = useRef(false)

  const [editing, setEditing] = useState<Editing | null>(null)
  const { uid } = useUser()
  const { initHouses, updateHouseOnAll, updateMemberOnAll } =
    useDispatchHouses()
  const { allHouses, houseId, members } = useHouses()
  const { currentDate } = useDate()

  useEffect(() => {
    /** todo: remove below for production */
    if (didLogRef.current) return
    didLogRef.current = true

    if (!uid.length) return
    if (allHouses || houseId || members) return

    initHouses(uid).catch((e) => {
      throw new Error(e)
    })
  }, [allHouses, houseId, members, initHouses, uid])

  if (!allHouses || !houseId || !members) return null
  const currentHouse = { ...allHouses[houseId] }
  if (!currentHouse.logs) return null
  const { logs, ...other } = currentHouse
  const tasks = sortTasks([...(logs[currentDate] ?? [])])

  const getMember = (memberId: string | null): Member | null => {
    if (!memberId) return null
    return members[memberId] ?? null
  }

  const updateTaskStatus = async (
    categoryId: CategoryId,
    taskId: TaskId,
    prevStatus: boolean,
    index: number
  ) => {
    const updatedTasks = [...tasks]
    const memberId = prevStatus ? null : uid
    const isCompleted = !prevStatus
    updatedTasks.splice(index, 1, { categoryId, taskId, memberId, isCompleted })
    const newLogs: House['logs'] = { ...logs, [currentDate]: updatedTasks }
    updateHouseOnAll({ ...other, logs: newLogs })
    await setLogToFirestore(houseId, currentDate, updatedTasks)
  }

  const switchTask = async (...args: Parameters<typeof updateTaskStatus>) => {
    const backUpLogs: House['logs'] = { ...logs, [currentDate]: [...tasks] }
    const [categoryId, taskId, prevStatus] = args
    const detail = other.housework[categoryId].taskDetails[taskId]
    if (!detail) return
    try {
      await updateTaskStatus(...args)
      const calc = detail.point * (prevStatus ? -1 : 1)
      const newPoints = members[uid].monthlyPoints + calc
      updateMemberOnAll(uid, 'monthlyPoints', newPoints)
    } catch (e) {
      updateHouseOnAll({ ...other, logs: backUpLogs })
    }
  }

  const handleEdit = (houseworkId: HouseworkId) => {
    setEditing({ houseworkId, editingStatus: EDITING_STATUS_ENUM.SAVE })
  }

  return (
    <StyledPaper>
      <List>
        {tasks.map(({ categoryId, taskId, memberId, isCompleted }, i) => {
          const key = `${categoryId}-${taskId}-${i}`
          const title = other.housework[categoryId].taskDetails[taskId]?.title
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
                onClick={() => switchTask(categoryId, taskId, isCompleted, i)}
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
                  primary={title}
                  secondary={getMember(memberId)?.displayName ?? ''}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
      <CustomDrawer editing={editing} setEditing={setEditing} />
    </StyledPaper>
  )
}

export default Home
