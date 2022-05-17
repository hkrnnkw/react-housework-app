/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { css } from '@emotion/react'
import {
  Box,
  Button,
  Chip,
  List,
  ListItem,
  styled,
  SwipeableDrawer,
} from '@mui/material'
import { grey } from '@mui/material/colors'
import { Editing, House } from '../../lib/type'
import { CurrentUser } from '../../lib/states/currentUser'
import Frequency from './Frequency'
import Point from './Point'
import Member from './Member'
import Title from './Title'
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
  editing: Editing | null
  members: CurrentUser[]
  housework: House['housework']
  setEditing: (editing: Editing | null) => void
}

const CustomDrawer: FC<Props> = ({
  editing,
  members,
  housework,
  setEditing,
}) => {
  const { deleteHousework, updateHouseworkDetail } = useDispatchHouse()
  if (!editing) return null

  const { DRAFT, SAVE } = EDITING_STATUS_ENUM
  const { houseworkId, editingStatus } = editing
  const { categoryId, taskId } = houseworkId
  const { category, taskDetails } = housework[categoryId]
  const { title, description, point, frequency, memberId } = taskDetails[taskId]

  const handleSave = async () => {
    const saving: Editing = { editingStatus: SAVE, houseworkId }
    const tasks: Promise<void>[] = [
      updateHouseworkDetail(saving, 'title', title),
      updateHouseworkDetail(saving, 'description', description),
      updateHouseworkDetail(saving, 'point', point),
      updateHouseworkDetail(saving, 'frequency', frequency),
      updateHouseworkDetail(saving, 'memberId', memberId),
    ]
    await Promise.all(tasks)
    setEditing({ houseworkId, editingStatus: SAVE })
  }

  const handleClose = () => {
    setEditing(null)
    if (editingStatus !== DRAFT) return
    deleteHousework(houseworkId)
  }

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={editing !== null}
      onClose={() => handleClose()}
      onOpen={() => setEditing(editing)}
    >
      <Puller />
      <List css={list}>
        <ListItem>
          <Chip label={category} />
          {editingStatus === DRAFT && (
            <Button
              onClick={() => handleSave()}
              variant="contained"
              css={button}
              disabled={!title.length}
            >
              作成
            </Button>
          )}
        </ListItem>
        <ListItem css={listItem}>
          <Title editing={editing} title={title} description={description} />
        </ListItem>
        <ListItem css={listItem}>
          <Member editing={editing} memberId={memberId} members={members} />
        </ListItem>
        <ListItem css={listItem}>
          <Point editing={editing} point={point} />
        </ListItem>
        <ListItem css={listItem}>
          <Frequency editing={editing} frequency={frequency} />
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

const button = css`
  width: 64px;
  height: 32px;
`
