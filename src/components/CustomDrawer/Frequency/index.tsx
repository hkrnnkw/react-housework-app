/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { css } from '@emotion/react'
import { EditingStatus, FrequencyType, HouseworkId } from '../../../lib/type'
import { FREQUENCY_ENUM } from '../../../lib/constant'
import TimesPerDays from './TimesPerDays'
import SpecificDayOfWeek from './SpecificDayOfWeek'
import SpecificDate from './SpecificDate'
import { useDispatchHouse } from '../../../contexts/houses'

type Props = {
  editingStatus: EditingStatus
  houseworkId: HouseworkId
  frequency: FrequencyType
}

const FrequencyItem: FC<Props> = ({
  editingStatus,
  houseworkId,
  frequency,
}) => {
  const { TIMES_PER_DAYS, DAYS_OF_WEEK, SPECIFIC_DATES } = FREQUENCY_ENUM
  const { key, values } = frequency
  const { temporary, timesPerDays, daysOfWeek, specificDates } = values

  if (key === TIMES_PER_DAYS) {
    return (
      <TimesPerDays
        editingStatus={editingStatus}
        frequency={timesPerDays}
        houseworkId={houseworkId}
      />
    )
  }
  if (key === DAYS_OF_WEEK) {
    return (
      <SpecificDayOfWeek
        editingStatus={editingStatus}
        frequency={daysOfWeek}
        houseworkId={houseworkId}
      />
    )
  }
  if (key === SPECIFIC_DATES) {
    return (
      <SpecificDate
        editingStatus={editingStatus}
        frequency={specificDates}
        houseworkId={houseworkId}
      />
    )
  }
  return temporary
}

const Frequency: FC<Props> = ({ editingStatus, houseworkId, frequency }) => {
  const { changeFrequencyKey } = useDispatchHouse()
  const { TEMPORARY, TIMES_PER_DAYS, DAYS_OF_WEEK, SPECIFIC_DATES } =
    FREQUENCY_ENUM

  const handleChangeFrequency = async (event: SelectChangeEvent) => {
    const newKey = event.target.value as FrequencyType['key']
    await changeFrequencyKey(editingStatus, houseworkId, newKey)
  }

  return (
    <>
      <Select
        labelId="select-x-times"
        id="select-x-times"
        value={frequency.key}
        onChange={handleChangeFrequency}
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
        houseworkId={houseworkId}
        frequency={frequency}
      />
    </>
  )
}

export default Frequency

const select = css`
  width: 100%;
`
