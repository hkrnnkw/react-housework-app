import React, { FC } from 'react'
import { Select } from '@mui/material'

export type EveryXDaysType = {
  x: number
}
export const EVERY_X_DAYS = 'EveryXDays'

type Props = {
  frequency: EveryXDaysType
}

const EveryXDays: FC<Props> = ({ frequency: { x } }) => {
  console.log('EveryXDays')

  return <Select />
}

export default EveryXDays
