/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { css } from '@emotion/react'
import { List, ListItem, ListItemText, SwipeableDrawer } from '@mui/material'
import { HouseworkDetail, HouseworkId } from '../../lib/type'
import { State as UserState } from '../../contexts/user/constants'
import Frequency from './Frequency'
import { useHouse } from '../../contexts/houses'
import Point from './Point'

type Props = {
  houseworkId: HouseworkId
  member: UserState | null
  housework: HouseworkDetail
  toggleDrawer: (houseworkId: HouseworkId | null) => void
}

const CustomDrawer: FC<Props> = ({
  houseworkId,
  member,
  housework,
  toggleDrawer,
}) => {
  const { currentHouse } = useHouse()
  if (!currentHouse) return null
  const { title, description, point, frequency } = housework

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
          <ListItemText
            primary="担当"
            secondary={member?.displayName ?? '未設定'}
          />
        </ListItem>
        <ListItem css={listItem}>
          <Point houseworkId={houseworkId} point={point} />
        </ListItem>
        <ListItem css={listItem}>
          <Frequency houseworkId={houseworkId} frequency={frequency} />
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
