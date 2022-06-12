/** @jsxImportSource @emotion/react */
import { FC, useState } from 'react'
import { Link as RouterLink, Outlet } from 'react-router-dom'
import {
  Accordion as MuiAccordion,
  AccordionSummary,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { css } from '@emotion/react'
import { useDispatchHouses, useHouses } from '../lib/hooks/store/houses'
import CustomDrawer from '../components/CustomDrawer'
import {
  CategoryId,
  Editing,
  HouseworkDetail,
  HouseworkId,
  Digit,
  TaskId,
} from '../lib/type'
import { EDITING_STATUS_ENUM } from '../lib/constant'
import { initialHousework } from '../lib/housework'

type TaskProps = {
  link: string
  houseworkDetail: HouseworkDetail
}

const Task: FC<TaskProps> = ({ link, houseworkDetail }) => (
  <Link component={RouterLink} to={link} state={{ link }}>
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemText
          id={link}
          primary={houseworkDetail.title}
          secondary={houseworkDetail.point}
        />
      </ListItemButton>
    </ListItem>
  </Link>
)

const makeNewTaskId = (num: number): TaskId => {
  if (num >= 1000) throw new Error('これ以上タスクを追加できません')
  const strArray = num.toString().split('')
  const len = strArray.length
  for (let i = 0; i < 3 - len; i += 1) {
    strArray.unshift('0')
  }
  const hundredsPlace = Number(strArray[0]) as Digit
  const tensPlace = Number(strArray[1]) as Digit
  const onesPlace = Number(strArray[2]) as Digit
  return `t${hundredsPlace}${tensPlace}${onesPlace}`
}

type AccordionProps = {
  categoryId: CategoryId
  categoryName: string
  taskDetails: {
    [taskId in TaskId]?: HouseworkDetail
  }
  setDraft: (editing: Editing | null) => void
}

const Accordion: FC<AccordionProps> = ({
  categoryId,
  categoryName,
  taskDetails,
  setDraft,
}) => {
  const { updateHouseOnAll } = useDispatchHouses()
  const { allHouses, currentHouse } = useHouses()
  if (!allHouses || !currentHouse) return null

  const taskDetailEntries = Object.entries(taskDetails)
  const newTaskId = makeNewTaskId(taskDetailEntries.length)

  const handleAdd = () => {
    const { housework, ...other } = { ...allHouses[currentHouse.id] }
    const newTaskDetails = { ...taskDetails, [newTaskId]: initialHousework }
    const category = housework[categoryId]
    const newCategory = { ...category, taskDetails: newTaskDetails }
    const newHousework = { ...housework, [categoryId]: newCategory }
    updateHouseOnAll({ ...other, housework: newHousework })

    const houseworkId: HouseworkId = { categoryId, taskId: newTaskId }
    setDraft({ houseworkId, editingStatus: EDITING_STATUS_ENUM.DRAFT })
  }

  return (
    <MuiAccordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{categoryName}</Typography>
      </AccordionSummary>
      <ListItem>
        <ListItemButton onClick={() => handleAdd()} css={addButton}>
          <ListItemText primary="追加する" />
          <IconButton aria-label="add-a-new-task">
            <AddIcon />
          </IconButton>
        </ListItemButton>
      </ListItem>
      {taskDetailEntries.map(([taskId, detail]) => {
        const id = `${categoryId}-${taskId}`
        return <Task key={id} link={id} houseworkDetail={detail} />
      })}
    </MuiAccordion>
  )
}

export const Index: FC = () => {
  const [draft, setDraft] = useState<Editing | null>(null)
  const { currentHouse, allHouses } = useHouses()
  if (!allHouses || !currentHouse) return null
  const { housework } = allHouses[currentHouse.id]

  return (
    <>
      <List>
        {Object.entries(housework).map(
          ([categoryId, { categoryName, taskDetails }]) => (
            <Accordion
              key={categoryId}
              categoryId={categoryId as CategoryId}
              categoryName={categoryName}
              taskDetails={taskDetails}
              setDraft={setDraft}
            />
          )
        )}
      </List>
      <CustomDrawer editing={draft} setEditing={setDraft} />
    </>
  )
}

const HouseworkList: FC = () => <Outlet />

export default HouseworkList

const addButton = css`
  & div {
    color: #6699ff;
  }
  & button {
    color: #6699ff;
  }
`
