import { FC } from 'react'
import { Button, Stack } from '@mui/material'
import { LocalizationProvider } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterDayjs'
import dayjs from 'dayjs'
import Calendar from './Calendar'
import { House, SpecificDateType } from '../../../../lib/type'
import { useDispatchHouse } from '../../../../contexts/houses'

type Props = {
  houseworkId: string
}

const SpecificDate: FC<Props> = ({ houseworkId }) => {
  const { changeSpecificDate, getCurrentHouseValue } = useDispatchHouse()

  const housework = getCurrentHouseValue('housework') as House['housework']
  const { frequency } = housework[houseworkId]
  const specificDates = frequency.specificDates ?? []

  const handleAdd = async () => {
    const newDates = [...specificDates]
    if (newDates.includes(null)) return
    await changeSpecificDate(houseworkId, [null, ...newDates])
  }

  const handleChange = async (newValue: dayjs.Dayjs | null, index: number) => {
    const newDates = [...specificDates]
    if (newValue === null) {
      newDates.splice(index, 1)
      await changeSpecificDate(houseworkId, newDates)
      return
    }
    const specificDate: SpecificDateType = {
      mm: newValue.month() + 1,
      dd: newValue.date(),
    }
    newDates.splice(index, 1, specificDate)
    await changeSpecificDate(houseworkId, newDates)
  }

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Stack spacing={2}>
        <Button onClick={() => handleAdd()}>追加する</Button>
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
