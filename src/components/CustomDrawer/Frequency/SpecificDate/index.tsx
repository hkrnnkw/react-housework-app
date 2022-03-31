import React, { FC, useState } from 'react'
import { Button, Stack } from '@mui/material'
import { LocalizationProvider } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterDayjs'
import dayjs from 'dayjs'
import Calendar from './Calendar'
import { FrequencyType, SpecificDateType } from '../../../../lib/type'

type Props = {
  frequency: FrequencyType['specificDates']
}

const SpecificDate: FC<Props> = ({ frequency }) => {
  const [specificDates, setspecificDates] = useState(frequency ?? [])

  const handleAdd = () => {
    const newDates = [...specificDates]
    if (newDates.includes(null)) return
    setspecificDates([null, ...newDates])
  }

  const handleChange = (newValue: dayjs.Dayjs | null, index: number) => {
    const newDates = [...specificDates]
    if (newValue === null) {
      newDates.splice(index, 1)
      setspecificDates(newDates)
      return
    }
    const specificDate: SpecificDateType = {
      month: newValue.month() + 1,
      day: newValue.date(),
    }
    newDates.splice(index, 1, specificDate)
    setspecificDates(newDates)
  }

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Stack spacing={2}>
        <Button onClick={() => handleAdd()}>追加する</Button>
        {specificDates.map((sd, i) => (
          <Calendar
            key={sd ? `${sd.month}/${sd.day}` : 'empty'}
            index={i}
            specificDates={specificDates}
            onChange={handleChange}
          />
        ))}
      </Stack>
    </LocalizationProvider>
  )
}

export default SpecificDate
