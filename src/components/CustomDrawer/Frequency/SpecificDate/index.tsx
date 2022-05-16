/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { Button, Stack } from '@mui/material'
import { css } from '@emotion/react'
import { LocalizationProvider } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterDayjs'
import dayjs from 'dayjs'
import Calendar from './Calendar'
import { SpecificDateType } from '../../../../lib/type'

type Props = {
  value: SpecificDateType[]
  handleChangeValue: (value: SpecificDateType[]) => Promise<void>
}

const SpecificDate: FC<Props> = ({ value, handleChangeValue }) => {
  const handleAdd = async () => {
    await handleChangeValue([null, ...value])
  }

  const handleChange = async (newValue: dayjs.Dayjs | null, index: number) => {
    const newDates = [...value]
    if (newValue === null) {
      newDates.splice(index, 1)
      await handleChangeValue(newDates)
      return
    }
    const specificDate: SpecificDateType = {
      mm: newValue.month() + 1,
      dd: newValue.date(),
    }
    newDates.splice(index, 1, specificDate)
    await handleChangeValue(newDates)
  }

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Stack spacing={2} css={container}>
        <Button
          onClick={() => handleAdd()}
          disabled={value.includes(null)}
          css={button}
        >
          追加する
        </Button>
        {value.map((sd, i) => (
          <Calendar
            key={sd ? `${sd.mm}/${sd.dd}` : 'empty'}
            index={i}
            specificDates={value}
            onChange={handleChange}
          />
        ))}
      </Stack>
    </LocalizationProvider>
  )
}

export default SpecificDate

const container = css`
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  column-gap: 1.3rem;
`

const button = css`
  width: 100%;
`
