import React, { FC } from 'react'
import { FormControl, InputLabel } from '@mui/material'
import { HouseworkDetail, TEMPORARY } from '../../../utils/types'
import SpecificDate, { SpecificDateType, SPECIFIC_DATE } from './SpecificDate'
import SpecificDayOfWeek, {
  SpecificDayOfWeekType,
  SPECIFIC_DAY_OF_WEEK,
} from './SpecificDayOfWeek'
import XTimesPerDay, { XTimesPerDayType, X_TIMES_PER_DAY } from './XTimesPerDay'
import EveryXDays, { EveryXDaysType, EVERY_X_DAYS } from './EveryXDays'

const CustomFormControl: FC = ({ children }) => (
  <FormControl fullWidth>
    <InputLabel id="demo-multiple-chip-label">頻度</InputLabel>
    {children}
  </FormControl>
)

type Props = {
  frequency: HouseworkDetail['frequency']
  frequencyType: HouseworkDetail['frequencyType']
}

const Frequency: FC<Props> = ({ frequency, frequencyType }) => {
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
          <SpecificDayOfWeek frequency={frequency as SpecificDayOfWeekType[]} />
        </CustomFormControl>
      )
    }
    case SPECIFIC_DATE: {
      return (
        <CustomFormControl>
          <SpecificDate frequency={frequency as SpecificDateType[]} />
        </CustomFormControl>
      )
    }
    case TEMPORARY: {
      return null
    }
    default: {
      return null
    }
  }
}

export default Frequency
