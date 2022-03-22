import React, { FC, useState } from 'react'
import { Select } from '@mui/material'

export type XTimesPerDayType = {
  x: number
}
export const X_TIMES_PER_DAY = 'XTimesPerDay'

type Props = {
  frequency: XTimesPerDayType
}

const XTimesPerDay: FC<Props> = ({ frequency: { x } }) => {
  console.log('XTimesPerDay')

  return <Select />
}

export default XTimesPerDay
