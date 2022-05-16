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
import { DayOfWeekType } from '../../../lib/type'

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
  value: DayOfWeekType[]
  handleChangeValue: (value: DayOfWeekType[]) => Promise<void>
}

const SpecificDayOfWeek: FC<Props> = ({ value, handleChangeValue }) => {
  const theme = useTheme()

  const handleChange = async (event: SelectChangeEvent<typeof value>) => {
    const { value: newValue } = event.target
    if (typeof newValue === 'string') {
      const splitted = newValue.split(',')
      const days = splitted.map((day) => DAY_OF_WEEK_ENUM[Number(day)])
      await handleChangeValue(days)
      return
    }
    await handleChangeValue(newValue)
  }

  return (
    <Select
      labelId="multiple-day-label"
      id="multiple-day"
      multiple
      value={value}
      onChange={handleChange}
      input={<OutlinedInput id="select-multiple-day" label="dayOfWeek" />}
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected.map((v) => (
            <Chip key={v} label={JPN_LOCALIZED_DAY_OF_WEEK_ENUM[v]} />
          ))}
        </Box>
      )}
      MenuProps={MenuProps}
      css={select}
    >
      {DAY_OF_WEEK_ENUM.map((day) => (
        <MenuItem key={day} value={day} style={getStyles(day, value, theme)}>
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
