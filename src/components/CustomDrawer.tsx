import React, { FC } from 'react'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
} from '@mui/material'
import { useHouse } from '../contexts/houses'
import { makeFrequencyText } from '../handlers/logsHandler'

type Props = {
  houseworkId: string | null
  toggleDrawer: (houseworkId: string | null) => void
}

const CustomDrawer: FC<Props> = ({ houseworkId, toggleDrawer }) => {
  const { currentHouse, houses } = useHouse()
  if (!houseworkId || !currentHouse || !houses) return null

  const { id: currentHouseId, members } = currentHouse
  const { housework } = houses[currentHouseId]
  const { title, description, memberId, points, frequency, frequencyType } =
    housework[houseworkId]
  const memberText = members[memberId ?? '']?.displayName ?? '未設定'
  const frequencyText = makeFrequencyText(frequency, frequencyType)

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={houseworkId !== null}
      onClose={() => toggleDrawer(null)}
      onOpen={() => toggleDrawer(houseworkId)}
    >
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemText
              primary={title}
              secondary={description ?? '説明がありません'}
            />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemText primary="担当" secondary={memberText} />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemText primary="ポイント" secondary={points} />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemText primary="頻度" secondary={frequencyText} />
          </ListItemButton>
        </ListItem>
      </List>
    </SwipeableDrawer>
  )
}

export default CustomDrawer
