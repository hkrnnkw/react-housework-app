/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { css } from '@emotion/react'
import { List, ListItem, ListItemText, SwipeableDrawer } from '@mui/material'
import FrequencyItem from './Frequency/FrequencyItem'
import SpecificDate from './Frequency/SpecificDate'
import SpecificDayOfWeek from './Frequency/SpecificDayOfWeek'
import XTimesPerDay from './Frequency/XTimesPerDay'
import EveryXDays from './Frequency/EveryXDays'
import Temporary from './Frequency/Temporary'
import { FrequencyType, HouseworkDetail } from '../../lib/type'
import { State as UserState } from '../../contexts/user/constants'

type Props = {
  member: UserState | null
  housework: HouseworkDetail
  toggleDrawer: (categoryId: string | null, houseworkId: string | null) => void
}

const CustomDrawer: FC<Props> = ({ member, housework, toggleDrawer }) => {
  const { categoryId, houseworkId, title, description, points, frequency } =
    housework
  const { xTimesPerDay, everyXDays, daysOfWeek, specificDates, temporary } =
    frequency
  const memberText = member?.displayName ?? '未設定'

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={categoryId !== null && houseworkId !== null}
      onClose={() => toggleDrawer(null, null)}
      onOpen={() => toggleDrawer(categoryId, houseworkId)}
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
            <XTimesPerDay
              frequency={xTimesPerDay}
              categoryId={categoryId}
              houseworkId={houseworkId}
            />
          </FrequencyItem>
          <FrequencyItem frequencyKey="everyXDays" houseworkId={houseworkId}>
            <EveryXDays
              frequency={everyXDays}
              categoryId={categoryId}
              houseworkId={houseworkId}
            />
          </FrequencyItem>
          <FrequencyItem frequencyKey="daysOfWeek" houseworkId={houseworkId}>
            <SpecificDayOfWeek
              frequency={daysOfWeek}
              categoryId={categoryId}
              houseworkId={houseworkId}
            />
          </FrequencyItem>
          <FrequencyItem frequencyKey="specificDates" houseworkId={houseworkId}>
            <SpecificDate
              frequency={specificDates}
              categoryId={categoryId}
              houseworkId={houseworkId}
            />
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
