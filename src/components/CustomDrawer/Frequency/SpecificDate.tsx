import React, { FC } from 'react'
import { Select } from '@mui/material'

export type SpecificDateType = {
  month: number
  day: number
}
export const SPECIFIC_DATE = 'SpecificDate'

type Props = {
  currentDate: string
  frequency: SpecificDateType[]
}

  console.log('SpecificDate')
const SpecificDate: FC<Props> = ({ currentDate, frequency }) => {

  return <Select />
}

export default SpecificDate
