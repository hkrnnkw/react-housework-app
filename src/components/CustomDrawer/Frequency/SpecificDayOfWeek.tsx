import React, { FC, useState } from 'react'
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
import { DayOfWeekType, FrequencyType } from '../../../lib/type'
import { DAY_OF_WEEK_ENUM } from '../../../lib/constant'

const japaneseLocalizeDayOfWeek = (dayOfWeek: DayOfWeekType): string => {
  switch (dayOfWeek) {
    case 'Sunday':
      return '日'
    case 'Monday':
      return '月'
    case 'Tuesday':
      return '火'
    case 'Wednesday':
      return '水'
    case 'Thursday':
      return '木'
    case 'Friday':
      return '金'
    case 'Saturday':
      return '土'
    default:
      return ''
  }
}

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
  day: string,
  dayOfWeek: readonly string[],
  theme: Theme
) => ({
  fontWeight:
    dayOfWeek.indexOf(day) === -1
      ? theme.typography.fontWeightRegular
      : theme.typography.fontWeightMedium,
})

type Props = {
  frequency: FrequencyType['daysOfWeek']
}

const SpecificDayOfWeek: FC<Props> = ({ frequency }) => {
  const theme = useTheme()
  const [dayOfWeek, setDayOfWeek] = useState<string[]>(frequency ?? [])
  const japaneseLocalized = dayOfWeek.map((day) =>
    japaneseLocalizeDayOfWeek(day as DayOfWeekType)
  )

  const handleChange = (event: SelectChangeEvent<typeof dayOfWeek>) => {
    const { target } = event
    const { value } = target
    setDayOfWeek(typeof value === 'string' ? value.split(',') : value)
  }

  return (
    <Select
      labelId="multiple-day-label"
      id="multiple-day"
      multiple
      value={japaneseLocalized}
      onChange={handleChange}
      input={<OutlinedInput id="select-multiple-day" label="dayOfWeek" />}
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected.map((value) => (
            <Chip key={value} label={value} />
          ))}
        </Box>
      )}
      MenuProps={MenuProps}
    >
      {Object.values(DAY_OF_WEEK_ENUM).map((day) => (
        <MenuItem
          key={day}
          value={day}
          style={getStyles(day, dayOfWeek, theme)}
        >
          {japaneseLocalizeDayOfWeek(day)}
        </MenuItem>
      ))}
    </Select>
  )
}

export default SpecificDayOfWeek
