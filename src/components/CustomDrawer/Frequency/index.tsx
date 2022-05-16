/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { css } from '@emotion/react'
import dayjs from 'dayjs'
import {
  DayOfWeekType,
  Editing,
  FrequencyType,
  FrequencyValue,
} from '../../../lib/type'
import { FREQUENCY_ENUM } from '../../../lib/constant'
import TimesPerDays from './TimesPerDays'
import SpecificDayOfWeek from './SpecificDayOfWeek'
import SpecificDate from './SpecificDate'
import { useDispatchHouse } from '../../../contexts/houses'

const getTimesPerDays = (
  value: FrequencyType['values']['timesPerDays']
): NonNullable<typeof value> => {
  if (value !== undefined) return value
  return { times: 1, days: 1 }
}

const getDaysOfWeek = (
  value: FrequencyType['values']['daysOfWeek']
): NonNullable<typeof value> => {
  if (value !== undefined) return value
  const today = dayjs()
  const dayOfWeek = today.day() as DayOfWeekType
  return [dayOfWeek]
}

const getSpecificDates = (
  value: FrequencyType['values']['specificDates']
): NonNullable<typeof value> => {
  if (value !== undefined) return value
  const today = dayjs()
  const specificDate = { mm: today.month() + 1, dd: today.date() }
  return [specificDate]
}

type Props = {
  editing: Editing
  frequency: FrequencyType
}

const FrequencyItem: FC<Props> = ({ editing, frequency }) => {
  const { updateHouseworkDetail } = useDispatchHouse()
  const { TIMES_PER_DAYS, DAYS_OF_WEEK, SPECIFIC_DATES } = FREQUENCY_ENUM
  const { key, values } = frequency
  const { temporary, timesPerDays, daysOfWeek, specificDates } = values

  const handleChangeValue = async (value: Omit<FrequencyValue, 'null'>) => {
    const newValues: FrequencyType['values'] = { ...values, [key]: value }
    const update: FrequencyType = { key, values: newValues }
    await updateHouseworkDetail(editing, 'frequency', update)
  }

  if (key === TIMES_PER_DAYS) {
    return (
      <TimesPerDays
        value={getTimesPerDays(timesPerDays)}
        handleChangeValue={handleChangeValue}
      />
    )
  }
  if (key === DAYS_OF_WEEK) {
    return (
      <SpecificDayOfWeek
        value={getDaysOfWeek(daysOfWeek)}
        handleChangeValue={handleChangeValue}
      />
    )
  }
  if (key === SPECIFIC_DATES) {
    return (
      <SpecificDate
        value={getSpecificDates(specificDates)}
        handleChangeValue={handleChangeValue}
      />
    )
  }
  return temporary
}

const getValue = (
  key: FrequencyType['key'],
  values: FrequencyType['values']
): FrequencyValue => {
  const { TEMPORARY, TIMES_PER_DAYS, DAYS_OF_WEEK } = FREQUENCY_ENUM
  if (key === TEMPORARY) return null
  if (key === TIMES_PER_DAYS) return getTimesPerDays(values[key])
  if (key === DAYS_OF_WEEK) return getDaysOfWeek(values[key])
  return getSpecificDates(values[key])
}

const Frequency: FC<Props> = ({ editing, frequency }) => {
  const { updateHouseworkDetail } = useDispatchHouse()
  const { key, values } = frequency
  const { TEMPORARY, TIMES_PER_DAYS, DAYS_OF_WEEK, SPECIFIC_DATES } =
    FREQUENCY_ENUM

  const handleChangeKey = async (event: SelectChangeEvent) => {
    const newKey = event.target.value as FrequencyType['key']
    const newValues = { ...values, [newKey]: getValue(newKey, values) }
    const update: FrequencyType = { key: newKey, values: newValues }
    await updateHouseworkDetail(editing, 'frequency', update)
  }

  return (
    <>
      <Select
        labelId="select-x-times"
        id="select-x-times"
        value={key}
        onChange={handleChangeKey}
        css={select}
      >
        <MenuItem key={TEMPORARY} value={TEMPORARY}>
          指定なし
        </MenuItem>
        <MenuItem key={TIMES_PER_DAYS} value={TIMES_PER_DAYS}>
          数日おき
        </MenuItem>
        <MenuItem key={DAYS_OF_WEEK} value={DAYS_OF_WEEK}>
          特定の曜日
        </MenuItem>
        <MenuItem key={SPECIFIC_DATES} value={SPECIFIC_DATES}>
          特定の日付
        </MenuItem>
      </Select>
      <FrequencyItem editing={editing} frequency={frequency} />
    </>
  )
}

export default Frequency

const select = css`
  width: 100%;
`
