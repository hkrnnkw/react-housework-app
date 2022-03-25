/** @jsxImportSource @emotion/react */
import React, { FC } from 'react'
import { FormControl, InputLabel } from '@mui/material'
import { css } from '@emotion/react'
import { HouseworkDetail } from '../../../utils/types'
import SpecificDate, { SpecificDateType, SPECIFIC_DATE } from './SpecificDate'
import SpecificDayOfWeek, {
  DayOfWeekType,
  SPECIFIC_DAY_OF_WEEK,
} from './SpecificDayOfWeek'
import XTimesPerDay, { XTimesPerDayType, X_TIMES_PER_DAY } from './XTimesPerDay'
import EveryXDays, { EveryXDaysType, EVERY_X_DAYS } from './EveryXDays'
import Temporary, { TEMPORARY } from './Temporary'

const CustomFormControl: FC = ({ children }) => (
  <FormControl fullWidth css={formControl}>
    <InputLabel id="demo-multiple-chip-label">頻度</InputLabel>
    {children}
  </FormControl>
)

type Props = {
  currentDate: string
  frequency: HouseworkDetail['frequency']
  frequencyType: HouseworkDetail['frequencyType']
}

const Frequency: FC<Props> = ({ currentDate, frequency, frequencyType }) => {
  switch (frequencyType) {
    case X_TIMES_PER_DAY: {
      return (
        <CustomFormControl>
          <XTimesPerDay frequency={frequency as XTimesPerDayType} />
        </CustomFormControl>
      )
    }
    case EVERY_X_DAYS: {
      return (
        <CustomFormControl>
          <EveryXDays frequency={frequency as EveryXDaysType} />
        </CustomFormControl>
      )
    }
    case SPECIFIC_DAY_OF_WEEK: {
      return (
        <CustomFormControl>
          <SpecificDayOfWeek frequency={frequency as DayOfWeekType[]} />
        </CustomFormControl>
      )
    }
    case SPECIFIC_DATE: {
      return (
        <CustomFormControl>
          <SpecificDate
            currentDate={currentDate}
            frequency={frequency as SpecificDateType[]}
          />
        </CustomFormControl>
      )
    }
    case TEMPORARY: {
      return (
        <CustomFormControl>
          <Temporary />
        </CustomFormControl>
      )
    }
    default: {
      return null
    }
  }
}

export default Frequency

const formControl = css`
  padding: 8px 16px;
`
