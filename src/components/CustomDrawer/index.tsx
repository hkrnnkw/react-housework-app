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
import { Editing, EditingStatus, HouseworkDetail } from '../../lib/type'
import Frequency from './Frequency'
import Point from './Point'
import Member from './Member'
import Title from './Title'
import Description from './Description'
import { EDITING_STATUS_ENUM, HOUSEWORK_DETAIL_ENUM } from '../../lib/constant'
import { useDispatchHouses, useHouses } from '../../lib/hooks/store/houses'
import { updateHouseworkOnFirestore } from '../../handlers/firestoreHandler'

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
  setEditing: (editing: Editing | null) => void
}

const CustomDrawer: FC<Props> = ({ editing, setEditing }) => {
  const { updateHouseOnAll } = useDispatchHouses()
  const { allHouses, houseId, members } = useHouses()
  if (!editing || !allHouses || !houseId || !members) return null

  const { DRAFT, SAVE } = EDITING_STATUS_ENUM
  const { houseworkId, editingStatus } = editing
  const { categoryId, taskId } = houseworkId

  const { housework, ...other } = { ...allHouses[houseId] }
  const category = housework[categoryId]
  const { categoryName, taskDetails } = category
  const detail = taskDetails[taskId]
  if (!detail) return null
  const { title, description, point, frequency, memberId } = detail

  const updateHouseworkDetail = async (
    status: EditingStatus,
    key: keyof HouseworkDetail,
    value: HouseworkDetail[typeof key]
  ) => {
    const newDetail = { ...detail, [key]: value }
    const newTaskDetails = { ...taskDetails, [taskId]: newDetail }
    const newCategory = { ...category, taskDetails: newTaskDetails }
    const newHousework = { ...housework, [categoryId]: newCategory }
    updateHouseOnAll({ ...other, housework: newHousework })
    if (status !== EDITING_STATUS_ENUM.SAVE) return

    try {
      await updateHouseworkOnFirestore(houseId, houseworkId, key, value)
    } catch (e) {
      updateHouseOnAll({ ...other, housework })
    }
  }

  const handleSave = async () => {
    const { TITLE, DESCRIPTION, MEMBER_ID, POINT, FREQUENCY } =
      HOUSEWORK_DETAIL_ENUM
    const tasks: Promise<void>[] = [
      updateHouseworkDetail(SAVE, TITLE, title),
      updateHouseworkDetail(SAVE, DESCRIPTION, description),
      updateHouseworkDetail(SAVE, MEMBER_ID, memberId),
      updateHouseworkDetail(SAVE, POINT, point),
      updateHouseworkDetail(SAVE, FREQUENCY, frequency),
    ]
    await Promise.all(tasks)
    setEditing({ houseworkId, editingStatus: SAVE })
  }

  const handleClose = () => {
    setEditing(null)
    if (editingStatus !== DRAFT) return

    const newTaskDetails = { ...taskDetails }
    const isDeleted = delete newTaskDetails[taskId]
    if (!isDeleted) return

    const newCategory = { ...category, taskDetails: newTaskDetails }
    const newHousework = { ...housework, [categoryId]: newCategory }
    updateHouseOnAll({ ...other, housework: newHousework })
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
          <Chip label={categoryName} />
          {editingStatus === DRAFT && (
            <Button
              onClick={() => handleSave()}
              variant="contained"
              css={button}
              disabled={!title.length}
            >
              ??????
            </Button>
          )}
        </ListItem>
        <ListItem css={listItem}>
          <Title
            editingStatus={editingStatus}
            title={title}
            updateValue={updateHouseworkDetail}
          />
          <Description
            editingStatus={editingStatus}
            description={description}
            updateValue={updateHouseworkDetail}
          />
        </ListItem>
        <ListItem css={listItem}>
          <Member
            editingStatus={editingStatus}
            memberId={memberId}
            members={Object.values(members)}
            updateValue={updateHouseworkDetail}
          />
        </ListItem>
        <ListItem css={listItem}>
          <Point
            editingStatus={editingStatus}
            point={point}
            updateValue={updateHouseworkDetail}
          />
        </ListItem>
        <ListItem css={listItem}>
          <Frequency
            editingStatus={editingStatus}
            frequency={frequency}
            updateValue={updateHouseworkDetail}
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

const button = css`
  width: 64px;
  height: 32px;
`
