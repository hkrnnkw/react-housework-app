/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import {
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { css } from '@emotion/react'
import { FrequencyType } from '../../../lib/type'
import { FREQUENCY_ENUM } from '../../../lib/constant'
import TimesPerDays from './TimesPerDays'
import SpecificDayOfWeek from './SpecificDayOfWeek'
import SpecificDate from './SpecificDate'
import { useDispatchHouse } from '../../../contexts/houses'

type Props = {
  categoryId: string
  frequency: FrequencyType
  taskId: string
}

const FrequencyItem: FC<Props> = ({ categoryId, frequency, taskId }) => {
  const { TIMES_PER_DAYS, DAYS_OF_WEEK, SPECIFIC_DATES } = FREQUENCY_ENUM
  const { key, values } = frequency
  const { temporary, timesPerDays, daysOfWeek, specificDates } = values

  if (key === TIMES_PER_DAYS) {
    return (
      <TimesPerDays
        frequency={timesPerDays}
        categoryId={categoryId}
        taskId={taskId}
      />
    )
  }
  if (key === DAYS_OF_WEEK) {
    return (
      <SpecificDayOfWeek
        frequency={daysOfWeek}
        categoryId={categoryId}
        taskId={taskId}
      />
    )
  }
  if (key === SPECIFIC_DATES) {
    return (
      <SpecificDate
        frequency={specificDates}
        categoryId={categoryId}
        taskId={taskId}
      />
    )
  }
  return temporary
}

const Frequency: FC<Props> = ({ categoryId, frequency, taskId }) => {
  const { changeFrequencyKey } = useDispatchHouse()

  const handleChangeFrequency = async (event: SelectChangeEvent) => {
    const newKey = event.target.value as FrequencyType['key']
    await changeFrequencyKey(categoryId, taskId, newKey)
  }

  return (
    <>
      <ListItemText primary="頻度" />
      <Select
        labelId="select-x-times"
        id="select-x-times"
        value={frequency.key}
        onChange={handleChangeFrequency}
        css={select}
      >
        {Object.values(FREQUENCY_ENUM).map((freq) => (
          <MenuItem key={freq} value={freq}>
            {freq}
          </MenuItem>
        ))}
      </Select>
      <FrequencyItem
        categoryId={categoryId}
        frequency={frequency}
        taskId={taskId}
      />
    </>
  )
}

export default Frequency

const select = css`
  width: 100%;
`
