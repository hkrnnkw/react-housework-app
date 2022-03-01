import React, { FC, useEffect, useState } from 'react'
import { Checkbox as MuiCheckbox, List } from '@mui/material'
import { Role } from '../utils/types'
import { useDispatchHouse, useHouse } from '../contexts/houses'
import { useUser } from '../contexts/user'
import { getDateObj } from '../handlers/logsHandler'
import ListItem from './atoms/ListItem'

type CheckboxProps = {
  role: Omit<Role, 'memberId'>
}

const Checkbox: FC<CheckboxProps> = ({ role }) => {
  const { isCompleted, houseworkId } = role
  const [isChecked, setIsChecked] = useState(isCompleted)
  const { switchRoleStatus } = useDispatchHouse()

  const handleToggle = async () => {
    const prevStatus = isChecked
    setIsChecked(!prevStatus)
    try {
      await switchRoleStatus(houseworkId)
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

  return (
    <List>
      {roles.map((role, i) => {
        const { houseworkId, memberId } = role
        return (
          <ListItem
            // eslint-disable-next-line react/no-array-index-key
            key={`${houseworkId}-${i}`}
            id={houseworkId}
            secondaryAction={<Checkbox role={role} />}
            primaryText={housework[houseworkId].title}
            secondaryText={memberId ?? ''}
            bgColor={memberId === uid ? '#DDDDFF' : '#FFFFFF'}
          />
        )
      })}
    </List>
  )
}

export default TodoList
