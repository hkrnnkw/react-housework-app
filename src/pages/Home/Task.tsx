import { FC } from 'react'
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { HouseworkDetail, HouseworkId, Task as TaskType } from '../../lib/type'
import { useDispatchHouses, useHouses } from '../../lib/hooks/store/houses'
import { useUser } from '../../lib/hooks/store/currentUser'
import { useDispatchSnackbar } from '../../lib/hooks/store/snackbar'

type Props = {
  point: HouseworkDetail['point']
  title: HouseworkDetail['title']
  task: TaskType
  index: number
  handleEdit: (houseworkId: HouseworkId) => void
  updateLogs: (index: number, newTask: TaskType) => Promise<void>
}

const Task: FC<Props> = ({
  point,
  title,
  task,
  index,
  handleEdit,
  updateLogs,
}) => {
  const { uid } = useUser()
  const { updateMemberOnAll } = useDispatchHouses()
  const { houseId, members } = useHouses()
  const { openSnackbar } = useDispatchSnackbar()
  if (!houseId || !members) return null

  const { categoryId, taskId, memberId, isCompleted: prevStatus } = task
  const key = `${categoryId}-${taskId}-${index}`
  const displayName = memberId ? members[memberId].displayName : ''

  const switchTask = async () => {
    const newTask: TaskType = {
      categoryId,
      taskId,
      memberId: prevStatus ? null : uid,
      isCompleted: !prevStatus,
    }
    try {
      await updateLogs(index, newTask)
      const calc = point * (prevStatus ? -1 : 1)
      const prevPoints = members[uid].monthlyPoints ?? 0
      updateMemberOnAll(uid, 'monthlyPoints', prevPoints + calc)
    } catch (e: unknown) {
      if (e instanceof Error) openSnackbar(e.message, 'error')
    }
  }

  return (
    <ListItem
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
      <ListItemButton onClick={() => switchTask()}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={prevStatus}
            inputProps={{ 'aria-labelledby': key }}
          />
        </ListItemIcon>
        <ListItemText id={key} primary={title} secondary={displayName} />
      </ListItemButton>
    </ListItem>
  )
}
export default Task
