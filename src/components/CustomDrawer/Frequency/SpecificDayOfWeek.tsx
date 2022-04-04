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
import { DAY_OF_WEEK_ENUM } from '../../../lib/constant'
import { useDispatchHouse } from '../../../contexts/houses'
import { DayOfWeekType, House } from '../../../lib/type'

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
  houseworkId: string
}

const SpecificDayOfWeek: FC<Props> = ({ houseworkId }) => {
  const theme = useTheme()
  const { changeDaysOfWeek, getCurrentHouseValue } = useDispatchHouse()

  const housework = getCurrentHouseValue('housework') as House['housework']
  const { frequency } = housework[houseworkId]
  const daysOfWeek = frequency.daysOfWeek ?? []

  const handleChange = async (event: SelectChangeEvent<typeof daysOfWeek>) => {
    const { value } = event.target
    if (typeof value === 'string') {
      await changeDaysOfWeek(houseworkId, value.split(',') as DayOfWeekType[])
      return
    }
    await changeDaysOfWeek(houseworkId, value)
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
            <Chip key={value} label={value} />
          ))}
        </Box>
      )}
      MenuProps={MenuProps}
      css={container}
    >
      {Object.values(DAY_OF_WEEK_ENUM).map((day) => (
        <MenuItem
          key={day}
          value={day}
          style={getStyles(day, daysOfWeek, theme)}
        >
          {day}
        </MenuItem>
      ))}
    </Select>
  )
}

export default SpecificDayOfWeek

const container = css`
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  column-gap: 1.3rem;
`
