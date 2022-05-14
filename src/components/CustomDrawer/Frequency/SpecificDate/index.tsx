/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { Button, Stack } from '@mui/material'
import { css } from '@emotion/react'
import { LocalizationProvider } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterDayjs'
import dayjs from 'dayjs'
import Calendar from './Calendar'
import { Editing, FrequencyType, SpecificDateType } from '../../../../lib/type'
import { useDispatchHouse } from '../../../../contexts/houses'

type Props = {
  editing: Editing
  frequency: FrequencyType['values']['specificDates']
}

const SpecificDate: FC<Props> = ({ editing, frequency }) => {
  const { changeFrequencyValue, initSpecificDates } = useDispatchHouse()
  const { houseworkId, editingStatus } = editing
  const specificDates = frequency ?? initSpecificDates()

  const handleAdd = async () => {
    const newDates = [...specificDates]
    await changeFrequencyValue(editingStatus, houseworkId, [null, ...newDates])
  }

  const handleChange = async (newValue: dayjs.Dayjs | null, index: number) => {
    const newDates = [...specificDates]
    if (newValue === null) {
      newDates.splice(index, 1)
      await changeFrequencyValue(editingStatus, houseworkId, newDates)
      return
    }
    const specificDate: SpecificDateType = {
      mm: newValue.month() + 1,
      dd: newValue.date(),
    }
    newDates.splice(index, 1, specificDate)
    await changeFrequencyValue(editingStatus, houseworkId, newDates)
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
