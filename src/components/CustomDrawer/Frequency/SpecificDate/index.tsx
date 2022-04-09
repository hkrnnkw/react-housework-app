/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { Button, Stack } from '@mui/material'
import { css } from '@emotion/react'
import { LocalizationProvider } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterDayjs'
import dayjs from 'dayjs'
import Calendar from './Calendar'
import { FrequencyType, SpecificDateType } from '../../../../lib/type'
import { useDispatchHouse } from '../../../../contexts/houses'

type Props = {
  frequency: FrequencyType['specificDates']
  categoryId: string
  houseworkId: string
}

const SpecificDate: FC<Props> = ({
  frequency = [],
  categoryId,
  houseworkId,
}) => {
  const { changeSpecificDate } = useDispatchHouse()

  const handleAdd = async () => {
    const newDates = [...frequency]
    await changeSpecificDate(categoryId, houseworkId, [null, ...newDates])
  }

  const handleChange = async (newValue: dayjs.Dayjs | null, index: number) => {
    const newDates = [...frequency]
    if (newValue === null) {
      newDates.splice(index, 1)
      await changeSpecificDate(categoryId, houseworkId, newDates)
      return
    }
    const specificDate: SpecificDateType = {
      mm: newValue.month() + 1,
      dd: newValue.date(),
    }
    newDates.splice(index, 1, specificDate)
    await changeSpecificDate(categoryId, houseworkId, newDates)
  }

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Stack spacing={2} css={container}>
        <Button
          onClick={() => handleAdd()}
          disabled={frequency.includes(null)}
          css={button}
        >
          追加する
        </Button>
        {frequency.map((sd, i) => (
          <Calendar
            key={sd ? `${sd.mm}/${sd.dd}` : 'empty'}
            index={i}
            specificDates={frequency}
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
