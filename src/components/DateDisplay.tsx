import React from 'react'
import { IconButton, Typography } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import {
  DirectionType,
  DIRECTION_TYPE_ENUM,
  useDispatchHouse,
  useHouse,
} from '../contexts/houses'

const DateDisplay: React.FC = () => {
  const { currentDate } = useHouse()
  const { changeDate } = useDispatchHouse()

  const handleDateChange = (to: DirectionType) => {
    changeDate(to)
  }

  const makeDate = () => {
    const dt = new Date(currentDate)
    const year = dt.getFullYear()
    const month = dt.getMonth() + 1
    const day = dt.getDate()
    return `${year} / ${month} / ${day}`
  }

  return (
    <div style={{ display: 'flex' }}>
      <IconButton
        color="primary"
        aria-label="left"
        component="span"
        onClick={() => handleDateChange(DIRECTION_TYPE_ENUM.PREV)}
      >
        <ChevronLeftIcon />
      </IconButton>
      <Typography variant="h5">{makeDate()}</Typography>
      <IconButton
        color="primary"
        aria-label="right"
        component="span"
        onClick={() => handleDateChange(DIRECTION_TYPE_ENUM.NEXT)}
      >
        <ChevronRightIcon />
      </IconButton>
    </div>
  )
}

export default DateDisplay