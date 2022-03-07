import React, { FC, useEffect, useState } from 'react'
import { Checkbox as MuiCheckbox, List } from '@mui/material'
import { Task } from '../utils/types'
import { useDispatchHouse, useHouse } from '../contexts/houses'
import { useUser } from '../contexts/user'
import { getDateObj } from '../handlers/logsHandler'
import ListItem from './atoms/ListItem'

type CheckboxProps = {
  task: Task
}

const Checkbox: FC<CheckboxProps> = ({
  task: { houseworkId, isCompleted = false },
}) => {
  const [isChecked, setIsChecked] = useState(isCompleted)
  const { switchTaskStatus } = useDispatchHouse()

  const handleToggle = async () => {
    const prevStatus = isChecked
    setIsChecked(!prevStatus)
    try {
      await switchTaskStatus(houseworkId, prevStatus)
    } catch (e) {
      setIsChecked(prevStatus)
    }
  }

  return (
    <MuiCheckbox
      edge="end"
      onChange={() => handleToggle()}
      checked={isChecked}
      inputProps={{ 'aria-labelledby': houseworkId }}
    />
  )
}

const TodoList: FC = () => {
  const { uid } = useUser()
  const { initHouses } = useDispatchHouse()
  const { currentDate, currentHouse, houses } = useHouse()

  useEffect(() => {
    if (!uid.length) return
    // eslint-disable-next-line no-console
    initHouses(uid).catch((e) => console.error(e))
  }, [initHouses, uid])

  if (!currentHouse || !houses) return null
  const { id: currentHouseId, members } = currentHouse
  const { logs, housework } = houses[currentHouseId]
  const { yyyy, mm, dd } = getDateObj(currentDate)
  const tasks = logs[yyyy][mm][dd] ?? []

  return (
    <List>
      {tasks.map((task, i) => {
        const { houseworkId, memberId } = task
        return (
          <ListItem
            // eslint-disable-next-line react/no-array-index-key
            key={`${houseworkId}-${i}`}
            id={houseworkId}
            secondaryAction={<Checkbox task={task} />}
            primaryText={housework[houseworkId].title}
            secondaryText={memberId ? members[memberId].displayName ?? '' : ''}
            bgColor={memberId === uid ? '#DDDDFF' : '#FFFFFF'}
          />
        )
      })}
    </List>
  )
}

export default TodoList
