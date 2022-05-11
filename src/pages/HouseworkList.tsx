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
import { useDispatchHouse, useHouse } from '../contexts/houses'
import CustomDrawer from '../components/CustomDrawer'
import { HouseworkDetail, HouseworkId } from '../lib/type'
import { EDITING_STATUS_ENUM } from '../lib/constant'

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

const makeNewTaskId = (num: number): string => {
  if (num >= 1000) throw new Error('これ以上タスクを追加できません')
  const str = num.toString()
  if (str.length === 1) return `hw00${str}`
  if (str.length === 2) return `hw0${str}`
  return `hw${str}`
}

type AccordionProps = {
  categoryId: string
  category: string
  taskDetails: {
    [taskId: string]: HouseworkDetail
  }
  setAdding: (houseworkId: HouseworkId | null) => void
}

const Accordion: FC<AccordionProps> = ({
  categoryId,
  category,
  taskDetails,
  setAdding,
}) => {
  const { createNewHousework } = useDispatchHouse()
  const taskDetailEntries = Object.entries(taskDetails)
  const newTaskId = makeNewTaskId(taskDetailEntries.length)

  const handleAdd = () => {
    const id: HouseworkId = { categoryId, taskId: newTaskId }
    createNewHousework(id)
    setAdding(id)
  }

  return (
    <MuiAccordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{category}</Typography>
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
  const [adding, setAdding] = useState<HouseworkId | null>(null)
  const { currentHouse, houses } = useHouse()

  if (!currentHouse || !houses) return null
  const { id: currentHouseId, members } = currentHouse
  const { housework } = houses[currentHouseId]

  return (
    <>
      <List>
        {Object.entries(housework).map(
          ([categoryId, { category, taskDetails }]) => (
            <Accordion
              key={categoryId}
              categoryId={categoryId}
              category={category}
              taskDetails={taskDetails}
              setAdding={setAdding}
            />
          )
        )}
      </List>
      {adding !== null && (
        <CustomDrawer
          editingStatus={EDITING_STATUS_ENUM.DRAFT}
          houseworkId={adding}
          members={Object.values(members)}
          housework={housework}
          toggleDrawer={setAdding}
        />
      )}
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
