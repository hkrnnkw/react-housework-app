import { FC } from 'react'
import { IconButton, Typography } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useDispatchHouse, useHouse } from '../contexts/houses'
import { DirectionType } from '../lib/type'
import { DIRECTION_ENUM } from '../lib/constant'

const DateDisplay: FC = () => {
  const { currentDate } = useHouse()
  const { changeDate } = useDispatchHouse()

  const handleDateChange = (to: DirectionType) => {
    changeDate(to)
  }

  return (
    <div style={{ display: 'flex' }}>
      <IconButton
        color="primary"
        aria-label="left"
        component="span"
        onClick={() => handleDateChange(DIRECTION_ENUM.PREV)}
      >
        <ChevronLeftIcon />
      </IconButton>
      <Typography variant="h5">{currentDate}</Typography>
      <IconButton
        color="primary"
        aria-label="right"
        component="span"
        onClick={() => handleDateChange(DIRECTION_ENUM.NEXT)}
      >
        <ChevronRightIcon />
      </IconButton>
    </div>
  )
}

export default DateDisplay
