/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import {
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { css } from '@emotion/react'
import { FrequencyType, HouseworkId } from '../../../lib/type'
import { FREQUENCY_ENUM } from '../../../lib/constant'
import TimesPerDays from './TimesPerDays'
import SpecificDayOfWeek from './SpecificDayOfWeek'
import SpecificDate from './SpecificDate'
import { useDispatchHouse } from '../../../contexts/houses'

type Props = {
  houseworkId: HouseworkId
  frequency: FrequencyType
}

const FrequencyItem: FC<Props> = ({ houseworkId, frequency }) => {
  const { TIMES_PER_DAYS, DAYS_OF_WEEK, SPECIFIC_DATES } = FREQUENCY_ENUM
  const { key, values } = frequency
  const { temporary, timesPerDays, daysOfWeek, specificDates } = values

  if (key === TIMES_PER_DAYS) {
    return <TimesPerDays frequency={timesPerDays} houseworkId={houseworkId} />
  }
  if (key === DAYS_OF_WEEK) {
    return (
      <SpecificDayOfWeek frequency={daysOfWeek} houseworkId={houseworkId} />
    )
  }
  if (key === SPECIFIC_DATES) {
    return <SpecificDate frequency={specificDates} houseworkId={houseworkId} />
  }
  return temporary
}

const Frequency: FC<Props> = ({ houseworkId, frequency }) => {
  const { changeFrequencyKey } = useDispatchHouse()

  const handleChangeFrequency = async (event: SelectChangeEvent) => {
    const newKey = event.target.value as FrequencyType['key']
    await changeFrequencyKey(houseworkId, newKey)
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
      <FrequencyItem houseworkId={houseworkId} frequency={frequency} />
    </>
  )
}

export default Frequency

const select = css`
  width: 100%;
`
