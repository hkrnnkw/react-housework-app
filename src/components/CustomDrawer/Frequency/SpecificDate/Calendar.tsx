/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { TextField } from '@mui/material'
import { MobileDatePicker } from '@mui/lab'
import { css } from '@emotion/react'
import dayjs from 'dayjs'
import { SpecificDateType } from '../../../../lib/type'

type Props = {
  index: number
  specificDates: SpecificDateType[]
  onChange: (value: dayjs.Dayjs | null, index: number) => void
}

const Calendar: FC<Props> = ({ index, specificDates, onChange }) => {
  const getValue = (): dayjs.Dayjs | null => {
    const copiedDates = [...specificDates]
    const specificDate = copiedDates[index]
    if (specificDate === null) return null
    const { mm, dd } = specificDate
    return dayjs(`${dayjs().year()}/${mm}/${dd}`)
  }

  const isDateDisabled = (dayjsInstance: dayjs.Dayjs): boolean => {
    const copiedDates = [...specificDates]
    const indexed = copiedDates.splice(index, 1)
    const theMonth = dayjsInstance.month() + 1
    const theDate = dayjsInstance.date()

    // about the currently selected date
    if (theMonth === indexed[0]?.mm && theDate === indexed[0]?.dd) {
      return dayjsInstance.year() !== dayjs().year()
    }
    // when adding or editing a specific date
    return (
      copiedDates.findIndex((sd) => {
        if (sd === null) return false
        return theMonth === sd.mm && theDate === sd.dd
      }) >= 0
    )
  }

  return (
    <MobileDatePicker
      value={getValue()}
      onChange={(newValue) => onChange(newValue, index)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      renderInput={(params) => <TextField {...params} css={textfield} />}
      clearable
      shouldDisableDate={(date) => isDateDisabled(date)}
    />
  )
}

export default Calendar

const textfield = css`
  width: 100%;
`
