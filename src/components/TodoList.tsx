import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { Role } from '../utils/types'
import { useDispatchHouse, useHouse } from '../contexts/houses'
import { useUser } from '../contexts/user'
import { getDateObj } from '../handlers/logsHandler'

  const { switchRoleStatus } = useDispatchHouse()

const TodoList: FC = () => {
  const { houseIds, uid } = useUser()
  const { changeCurrentHouse } = useDispatchHouse()
  const { currentDate, currentHouse } = useHouse()

  useEffect(() => {
    if (!houseIds.length) return
    // eslint-disable-next-line no-console
    changeCurrentHouse(houseIds[0]).catch((e) => console.error(e))
  }, [changeCurrentHouse, houseIds])

  if (!currentHouse) return null
  const { logs, housework } = currentHouse
  const { yyyy, mm, dd } = getDateObj(currentDate)
  const roles: Role[] = logs[yyyy][mm][dd] ?? []

  const handleToggle = async (houseworkId: string) => {
    await switchRoleStatus(houseworkId)
  }

  return (
    <List>
      {roles.map(({ houseworkId, memberId, isCompleted }, i) => (
        <ListItem
          key={`${houseworkId}-${i}`} // eslint-disable-line react/no-array-index-key
          secondaryAction={
            <Checkbox
              edge="end"
              onChange={() => handleToggle(houseworkId)}
              checked={isCompleted}
              inputProps={{ 'aria-labelledby': houseworkId }}
            />
          }
          disablePadding
          style={{
            backgroundColor: memberId === uid ? '#DDDDFF' : '#FFFFFF',
          }}
        >
          <ListItemButton>
            <ListItemText
              id={houseworkId}
              primary={housework[houseworkId].description}
              secondary={memberId ?? ''}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default TodoList
