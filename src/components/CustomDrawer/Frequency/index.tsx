/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { css } from '@emotion/react'
import dayjs from 'dayjs'
import {
  DayOfWeekType,
  EditingStatus,
  FrequencyType,
  FrequencyValue,
  HouseworkDetail,
} from '../../../lib/type'
import { FREQUENCY_ENUM, HOUSEWORK_DETAIL_ENUM } from '../../../lib/constant'
import TimesPerDays from './TimesPerDays'
import SpecificDayOfWeek from './SpecificDayOfWeek'
import SpecificDate from './SpecificDate'

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

const KEY = HOUSEWORK_DETAIL_ENUM.FREQUENCY

type Props = {
  editingStatus: EditingStatus
  frequency: FrequencyType
  updateValue: (
    editingStatus: EditingStatus,
    key: typeof KEY,
    value: HouseworkDetail[typeof KEY]
  ) => Promise<void>
}

const FrequencyItem: FC<Props> = ({
  editingStatus,
  frequency,
  updateValue,
}) => {
  const { TIMES_PER_DAYS, DAYS_OF_WEEK, SPECIFIC_DATES } = FREQUENCY_ENUM
  const { key, values } = frequency
  const { temporary, timesPerDays, daysOfWeek, specificDates } = values

  const handleChangeValue = async (value: FrequencyValue) => {
    const newValues: FrequencyType['values'] = { ...values, [key]: value }
    const update: FrequencyType = { key, values: newValues }
    await updateValue(editingStatus, KEY, update)
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

const getValue = (frequency: FrequencyType): FrequencyValue | null => {
  const { key, values } = frequency
  const { TIMES_PER_DAYS, DAYS_OF_WEEK, SPECIFIC_DATES } = FREQUENCY_ENUM
  if (key === TIMES_PER_DAYS) return getTimesPerDays(values[key])
  if (key === DAYS_OF_WEEK) return getDaysOfWeek(values[key])
  if (key === SPECIFIC_DATES) return getSpecificDates(values[key])
  return null
}

const Frequency: FC<Props> = ({ editingStatus, frequency, updateValue }) => {
  const { key, values } = frequency
  const { TEMPORARY, TIMES_PER_DAYS, DAYS_OF_WEEK, SPECIFIC_DATES } =
    FREQUENCY_ENUM

  const handleChangeKey = async (event: SelectChangeEvent) => {
    const newKey = event.target.value as FrequencyType['key']
    const newValues = { ...values, [newKey]: getValue({ key: newKey, values }) }
    const update: FrequencyType = { key: newKey, values: newValues }
    await updateValue(editingStatus, KEY, update)
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
      <FrequencyItem
        editingStatus={editingStatus}
        frequency={frequency}
        updateValue={updateValue}
      />
    </>
  )
}

export default Frequency

const select = css`
  width: 100%;
`
