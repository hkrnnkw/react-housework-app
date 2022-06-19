import { FC } from 'react'
import { IconButton, Typography } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useDate, useDispatchDate } from '../lib/hooks/store/currentDate'
import { useDispatchHouses, useHouses } from '../lib/hooks/store/houses'
import { DIRECTION_ENUM } from '../lib/constant'
import { DirectionType } from '../lib/type'
import { createLogs } from '../handlers/logsHandler'

const DateDisplay: FC = () => {
  const { currentDate } = useDate()
  const { changeDate } = useDispatchDate()
  const { updateHouseOnAll } = useDispatchHouses()
  const { allHouses, houseId } = useHouses()
  if (!allHouses || !houseId) return null

  const { PREV, NEXT } = DIRECTION_ENUM

  const handleChangeDate = (direction: DirectionType) => {
    const newDate = changeDate(direction)

    const { housework, logs: prevLogs, ...other } = allHouses[houseId]
    const logs = createLogs(housework, { ...prevLogs }, newDate)
    updateHouseOnAll({ ...other, housework, logs })
  }

  return (
    <div style={{ display: 'flex' }}>
      <IconButton
        color="primary"
        aria-label="left"
        component="span"
        onClick={() => handleChangeDate(PREV)}
      >
        <ChevronLeftIcon />
      </IconButton>
      <Typography variant="h5">{currentDate}</Typography>
      <IconButton
        color="primary"
        aria-label="right"
        component="span"
        onClick={() => handleChangeDate(NEXT)}
      >
        <ChevronRightIcon />
      </IconButton>
    </div>
  )
}

export default DateDisplay
