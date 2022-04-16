/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { css } from '@emotion/react'
import { List, ListItem, ListItemText, SwipeableDrawer } from '@mui/material'
import { HouseworkDetail } from '../../lib/type'
import { State as UserState } from '../../contexts/user/constants'
import Frequency from './Frequency'
import { useHouse } from '../../contexts/houses'

type Props = {
  member: UserState | null
  housework: HouseworkDetail
  toggleDrawer: (categoryId: string | null, houseworkId: string | null) => void
}

const CustomDrawer: FC<Props> = ({ member, housework, toggleDrawer }) => {
  const { currentHouse } = useHouse()
  if (!currentHouse) return null

  const { categoryId, houseworkId, title, description, points, frequency } =
    housework

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
          <ListItemText
            primary="担当"
            secondary={member?.displayName ?? '未設定'}
          />
        </ListItem>
        <ListItem css={listItem}>
          <ListItemText primary="ポイント" secondary={points} />
        </ListItem>
        <ListItem css={listItem}>
          <Frequency
            categoryId={categoryId}
            frequency={frequency}
            houseworkId={houseworkId}
          />
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
