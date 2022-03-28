import React, { FC } from 'react'
import { TextField } from '@mui/material'
import { MobileDatePicker } from '@mui/lab'
import dayjs from 'dayjs'
// eslint-disable-next-line import/no-cycle
import { SpecificDateType } from '.'

type Props = {
  index: number
  specificDates: (SpecificDateType | null)[]
  onChange: (value: dayjs.Dayjs | null, index: number) => void
}

const Calendar: FC<Props> = ({ index, specificDates, onChange }) => {
  const getValue = (): dayjs.Dayjs | null => {
    const copiedDates = [...specificDates]
    const specificDate = copiedDates[index]
    if (specificDate === null) return null
    const { month, day } = specificDate
    return dayjs(`${dayjs().year()}/${month}/${day}`)
  }

  const isDateDisabled = (dayjsInstance: dayjs.Dayjs): boolean => {
    const copiedDates = [...specificDates]
    const indexed = copiedDates.splice(index, 1)
    const theMonth = dayjsInstance.month() + 1
    const theDate = dayjsInstance.date()

    // about the currently selected date
    if (theMonth === indexed[0]?.month && theDate === indexed[0]?.day) {
      return dayjsInstance.year() !== dayjs().year()
    }
    // when adding or editing a specific date
    return (
      copiedDates.findIndex((sd) => {
        if (sd === null) return false
        return theMonth === sd.month && theDate === sd.day
      }) >= 0
    )
  }

  return (
    <MobileDatePicker
      value={getValue()}
      onChange={(newValue) => onChange(newValue, index)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      renderInput={(params) => <TextField {...params} />}
      clearable
      shouldDisableDate={(date) => isDateDisabled(date)}
    />
  )
}

export default Calendar
