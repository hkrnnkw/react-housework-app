/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { css } from '@emotion/react'
import { Box, List, ListItem, styled, SwipeableDrawer } from '@mui/material'
import { grey } from '@mui/material/colors'
import { HouseworkDetail, HouseworkId } from '../../lib/type'
import { State as UserState } from '../../contexts/user/constants'
import Frequency from './Frequency'
import { useHouse } from '../../contexts/houses'
import Point from './Point'
import Member from './Member'
import Title from './Title'

const Puller = styled(Box)(({ theme }) => ({
  width: 40,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}))

type Props = {
  houseworkId: HouseworkId
  members: UserState[]
  housework: HouseworkDetail
  toggleDrawer: (houseworkId: HouseworkId | null) => void
}

const CustomDrawer: FC<Props> = ({
  houseworkId,
  members,
  housework,
  toggleDrawer,
}) => {
  const { currentHouse } = useHouse()
  if (!currentHouse) return null
  const { title, description, point, frequency, memberId } = housework

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={houseworkId !== null}
      onClose={() => toggleDrawer(null)}
      onOpen={() => toggleDrawer(houseworkId)}
    >
      <Puller />
      <List>
        <ListItem css={listItem}>
          <Title
            houseworkId={houseworkId}
            title={title}
            description={description}
          />
        </ListItem>
        <ListItem css={listItem}>
          <Member
            houseworkId={houseworkId}
            memberId={memberId}
            members={members}
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
