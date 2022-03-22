import React, { FC } from 'react'
import { Select } from '@mui/material'

export type SpecificDateType = {
  month: number
  day: number
}
export const SPECIFIC_DATE = 'SpecificDate'

type Props = {
  frequency: SpecificDateType[]
}

const SpecificDate: FC<Props> = ({ frequency }) => {
  console.log('SpecificDate')

  return <Select />
}

export default SpecificDate
