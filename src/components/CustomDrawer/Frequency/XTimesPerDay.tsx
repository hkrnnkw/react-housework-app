import React, { FC, useState } from 'react'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'

export type XTimesPerDayType = {
  x: number
}
export const X_TIMES_PER_DAY = 'XTimesPerDay'

type Props = {
  frequency: XTimesPerDayType
}

const XTimesPerDay: FC<Props> = ({ frequency: { x } }) => {
  const [xTime, setXTime] = useState(x.toString())

  const handleChange = (event: SelectChangeEvent) => {
    setXTime(event.target.value)
  }

  return (
    <Select
      labelId="select-x-times"
      id="select-x-times"
      value={xTime}
      label="xTime"
      onChange={handleChange}
    >
      <MenuItem value={1}>1</MenuItem>
      <MenuItem value={2}>2</MenuItem>
      <MenuItem value={3}>3</MenuItem>
      <MenuItem value={4}>4</MenuItem>
      <MenuItem value={5}>5</MenuItem>
      <MenuItem value={6}>6</MenuItem>
      <MenuItem value={7}>7</MenuItem>
      <MenuItem value={8}>8</MenuItem>
      <MenuItem value={9}>9</MenuItem>
      <MenuItem value={10}>10</MenuItem>
    </Select>
  )
}

export default XTimesPerDay
