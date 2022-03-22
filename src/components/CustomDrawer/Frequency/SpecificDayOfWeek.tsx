import React, { FC, useState } from 'react'
import { Select } from '@mui/material'

export type SpecificDayOfWeekType =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
export const SPECIFIC_DAY_OF_WEEK = 'SpecificDayOfWeek'

type Props = {
  frequency: SpecificDayOfWeekType[]
}

const SpecificDayOfWeek: FC<Props> = ({ frequency }) => {
  console.log('SpecificDayOfWeek')

  return <Select />
}

export default SpecificDayOfWeek
