import React, { FC, useEffect } from 'react'
import { Checkbox, List } from '@mui/material'
import { useDispatchHouse, useHouse } from '../contexts/houses'
import { useUser } from '../contexts/user'
import ListItem from './atoms/ListItem'

const TodoList: FC = () => {
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

  const handleTaskComplete = async (id: string, prevStatus: boolean) => {
    await switchTaskStatus(uid, id, prevStatus)
  }

  return (
    <List>
      {tasks.map((task, i) => {
        const { houseworkId, memberId, isCompleted = false } = task
        return (
          <ListItem
            // eslint-disable-next-line react/no-array-index-key
            key={`${houseworkId}-${i}`}
            id={houseworkId}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={() => handleTaskComplete(houseworkId, isCompleted)}
                checked={isCompleted}
                inputProps={{ 'aria-labelledby': houseworkId }}
              />
            }
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
