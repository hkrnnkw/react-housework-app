/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { css } from '@emotion/react'
import {
  Box,
  Chip,
  List,
  ListItem,
  styled,
  SwipeableDrawer,
} from '@mui/material'
import { grey } from '@mui/material/colors'
import { EditingStatus, House, HouseworkId } from '../../lib/type'
import { State as UserState } from '../../contexts/user/constants'
import Frequency from './Frequency'
import Point from './Point'
import Member from './Member'
import Title from './Title'
import SaveButton from './SaveButton'
import { useDispatchHouse } from '../../contexts/houses'
import { EDITING_STATUS_ENUM } from '../../lib/constant'

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
  editingStatus: EditingStatus
  houseworkId: HouseworkId
  members: UserState[]
  housework: House['housework']
  toggleDrawer: (houseworkId: HouseworkId | null) => void
}

const CustomDrawer: FC<Props> = ({
  editingStatus,
  houseworkId,
  members,
  housework,
  toggleDrawer,
}) => {
  const { updateCurrentHousework } = useDispatchHouse()
  const { DRAFT, SAVE } = EDITING_STATUS_ENUM
  const { categoryId, taskId } = houseworkId
  const { category, taskDetails } = housework[categoryId]
  const { title, description, point, frequency, memberId } = taskDetails[taskId]

  const handleSave = async () => {
    await updateCurrentHousework(SAVE, housework)
  }

  const handleClose = () => {
    toggleDrawer(null)
  }

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={houseworkId !== null}
      onClose={() => handleClose()}
      onOpen={() => toggleDrawer(houseworkId)}
    >
      <Puller />
      <List css={list}>
        <ListItem>
          <Chip label={category} />
          {editingStatus === DRAFT && (
            <SaveButton
              disabled={!title.length}
              handleClick={() => handleSave()}
            />
          )}
        </ListItem>
        <ListItem css={listItem}>
          <Title
            editingStatus={editingStatus}
            houseworkId={houseworkId}
            title={title}
            description={description}
          />
        </ListItem>
        <ListItem css={listItem}>
          <Member
            editingStatus={editingStatus}
            houseworkId={houseworkId}
            memberId={memberId}
            members={members}
          />
        </ListItem>
        <ListItem css={listItem}>
          <Point
            editingStatus={editingStatus}
            houseworkId={houseworkId}
            point={point}
          />
        </ListItem>
        <ListItem css={listItem}>
          <Frequency
            editingStatus={editingStatus}
            houseworkId={houseworkId}
            frequency={frequency}
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
  padding: 8px 0;
`

const list = css`
  padding: 32px;
`
