import { FC, useEffect, useRef, useState } from 'react'
import { List } from '@mui/material'
import { useDispatchHouses, useHouses } from '../../lib/hooks/store/houses'
import { useUser } from '../../lib/hooks/store/currentUser'
import StyledPaper from '../../components/atoms/StyledPaper'
import CustomDrawer from '../../components/CustomDrawer/index'
import { Editing, House, HouseworkId, Task as TaskType } from '../../lib/type'
import { sortTasks } from '../../handlers/logsHandler'
import { EDITING_STATUS_ENUM } from '../../lib/constant'
import { useDate } from '../../lib/hooks/store/currentDate'
import Task from './Task'
import { setLogToFirestore } from '../../handlers/firestoreHandler'

const Home: FC = () => {
  /** todo: remove below for production */
  const didLogRef = useRef(false)

  const [editing, setEditing] = useState<Editing | null>(null)
  const { uid } = useUser()
  const { initHouses, updateHouseOnAll } = useDispatchHouses()
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

  const handleEdit = (houseworkId: HouseworkId) => {
    setEditing({ houseworkId, editingStatus: EDITING_STATUS_ENUM.SAVE })
  }

  const updateLogs = async (index: number, newTask: TaskType) => {
    const backUpLogs: House['logs'] = { ...logs, [currentDate]: [...tasks] }
    const updatedTasks = [...tasks]
    updatedTasks.splice(index, 1, newTask)
    const newLogs: House['logs'] = { ...logs, [currentDate]: updatedTasks }
    updateHouseOnAll({ ...other, logs: newLogs })
    try {
      await setLogToFirestore(houseId, currentDate, updatedTasks)
    } catch (e) {
      updateHouseOnAll({ ...other, logs: backUpLogs })
    }
  }

  return (
    <StyledPaper>
      <List>
        {tasks.map((task, i) => {
          const { categoryId, taskId } = task
          const key = `${categoryId}-${taskId}-${i}`
          const detail = other.housework[categoryId].taskDetails[taskId]
          if (!detail) return null
          const { point, title } = detail
          return (
            <Task
              key={key}
              point={point}
              title={title}
              task={task}
              index={i}
              handleEdit={handleEdit}
              updateLogs={updateLogs}
            />
          )
        })}
      </List>
      <CustomDrawer editing={editing} setEditing={setEditing} />
    </StyledPaper>
  )
}

export default Home
