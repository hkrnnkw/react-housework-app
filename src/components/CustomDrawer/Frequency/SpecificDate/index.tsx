/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { Button, Stack } from '@mui/material'
import { css } from '@emotion/react'
import { LocalizationProvider } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterDayjs'
import dayjs from 'dayjs'
import Calendar from './Calendar'
import {
  FrequencyType,
  HouseworkId,
  SpecificDateType,
} from '../../../../lib/type'
import { useDispatchHouse } from '../../../../contexts/houses'

type Props = {
  frequency: FrequencyType['values']['specificDates']
  houseworkId: HouseworkId
}

const SpecificDate: FC<Props> = ({ frequency, houseworkId }) => {
  const { changeFrequencyValue, initSpecificDates } = useDispatchHouse()
  const specificDates = frequency ?? initSpecificDates()
  const { categoryId, taskId } = houseworkId

  const handleAdd = async () => {
    const newDates = [...specificDates]
    await changeFrequencyValue(categoryId, taskId, [null, ...newDates])
  }

  const handleChange = async (newValue: dayjs.Dayjs | null, index: number) => {
    const newDates = [...specificDates]
    if (newValue === null) {
      newDates.splice(index, 1)
      await changeFrequencyValue(categoryId, taskId, newDates)
      return
    }
    const specificDate: SpecificDateType = {
      mm: newValue.month() + 1,
      dd: newValue.date(),
    }
    newDates.splice(index, 1, specificDate)
    await changeFrequencyValue(categoryId, taskId, newDates)
  }

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Stack spacing={2} css={container}>
        <Button
          onClick={() => handleAdd()}
          disabled={specificDates.includes(null)}
          css={button}
        >
          追加する
        </Button>
        {specificDates.map((sd, i) => (
          <Calendar
            key={sd ? `${sd.mm}/${sd.dd}` : 'empty'}
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
