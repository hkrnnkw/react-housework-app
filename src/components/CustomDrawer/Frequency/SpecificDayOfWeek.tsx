/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import {
  Box,
  Chip,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
  useTheme,
} from '@mui/material'
import { css } from '@emotion/react'
import {
  DAY_OF_WEEK_ENUM,
  JPN_LOCALIZED_DAY_OF_WEEK_ENUM,
} from '../../../lib/constant'
import { useDispatchHouse } from '../../../contexts/houses'
import { FrequencyType, HouseworkId } from '../../../lib/type'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const getStyles = (
  day: number,
  dayOfWeek: readonly number[],
  theme: Theme
) => ({
  fontWeight:
    dayOfWeek.indexOf(day) === -1
      ? theme.typography.fontWeightRegular
      : theme.typography.fontWeightMedium,
})

type Props = {
  frequency: FrequencyType['values']['daysOfWeek']
  houseworkId: HouseworkId
}

const SpecificDayOfWeek: FC<Props> = ({ frequency, houseworkId }) => {
  const theme = useTheme()
  const { changeFrequencyValue, initDaysOfWeek } = useDispatchHouse()
  const daysOfWeek = frequency ?? initDaysOfWeek()
  const { categoryId, taskId } = houseworkId

  const handleChange = async (event: SelectChangeEvent<typeof daysOfWeek>) => {
    const { value } = event.target
    if (typeof value === 'string') {
      const splitted = value.split(',')
      const days = splitted.map((day) => DAY_OF_WEEK_ENUM[Number(day)])
      await changeFrequencyValue(categoryId, taskId, days)
      return
    }
    await changeFrequencyValue(categoryId, taskId, value)
  }

  return (
    <Select
      labelId="multiple-day-label"
      id="multiple-day"
      multiple
      value={daysOfWeek}
      onChange={handleChange}
      input={<OutlinedInput id="select-multiple-day" label="dayOfWeek" />}
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected.map((value) => (
            <Chip key={value} label={JPN_LOCALIZED_DAY_OF_WEEK_ENUM[value]} />
          ))}
        </Box>
      )}
      MenuProps={MenuProps}
      css={select}
    >
      {DAY_OF_WEEK_ENUM.map((day) => (
        <MenuItem
          key={day}
          value={day}
          style={getStyles(day, daysOfWeek, theme)}
        >
          {JPN_LOCALIZED_DAY_OF_WEEK_ENUM[day]}
        </MenuItem>
      ))}
    </Select>
  )
}

export default SpecificDayOfWeek

const select = css`
  width: 100%;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  column-gap: 1.3rem;
  padding: 8px 0px;
`
