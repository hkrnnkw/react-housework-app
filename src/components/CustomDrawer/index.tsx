/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { css } from '@emotion/react'
import { List, ListItem, ListItemText, SwipeableDrawer } from '@mui/material'
import { useHouse } from '../../contexts/houses'
import FrequencyItem from './Frequency/FrequencyItem'
import SpecificDate from './Frequency/SpecificDate'
import SpecificDayOfWeek from './Frequency/SpecificDayOfWeek'
import XTimesPerDay from './Frequency/XTimesPerDay'
import EveryXDays from './Frequency/EveryXDays'
import Temporary from './Frequency/Temporary'

type Props = {
  houseworkId: string | null
  toggleDrawer: (houseworkId: string | null) => void
}

const CustomDrawer: FC<Props> = ({ houseworkId, toggleDrawer }) => {
  const { currentHouse, houses } = useHouse()
  if (!houseworkId || !currentHouse || !houses) return null

  const { id: currentHouseId, members } = currentHouse
  const { housework } = houses[currentHouseId]
  const { title, description, memberId, points } = housework[houseworkId]
  const memberText = members[memberId ?? '']?.displayName ?? '未設定'

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={houseworkId !== null}
      onClose={() => toggleDrawer(null)}
      onOpen={() => toggleDrawer(houseworkId)}
    >
      <List>
        <ListItem css={listItem}>
          <ListItemText
            primary={title}
            secondary={description ?? '説明がありません'}
          />
        </ListItem>
        <ListItem css={listItem}>
          <ListItemText primary="担当" secondary={memberText} />
        </ListItem>
        <ListItem css={listItem}>
          <ListItemText primary="ポイント" secondary={points} />
        </ListItem>
        <ListItem css={listItem}>
          <ListItemText primary="頻度" />
          <FrequencyItem frequencyKey="xTimesPerDay" houseworkId={houseworkId}>
            <XTimesPerDay houseworkId={houseworkId} />
          </FrequencyItem>
          <FrequencyItem frequencyKey="everyXDays" houseworkId={houseworkId}>
            <EveryXDays houseworkId={houseworkId} />
          </FrequencyItem>
          <FrequencyItem frequencyKey="daysOfWeek" houseworkId={houseworkId}>
            <SpecificDayOfWeek houseworkId={houseworkId} />
          </FrequencyItem>
          <FrequencyItem frequencyKey="specificDates" houseworkId={houseworkId}>
            <SpecificDate houseworkId={houseworkId} />
          </FrequencyItem>
          <FrequencyItem frequencyKey="temporary" houseworkId={houseworkId}>
            <Temporary />
          </FrequencyItem>
        </ListItem>
      </List>
    </SwipeableDrawer>
  )
}

export default CustomDrawer

const listItem = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 32px;
`
