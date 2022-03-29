/** @jsxImportSource @emotion/react */
import React, { FC } from 'react'
import { FormControl, InputLabel } from '@mui/material'
import { css } from '@emotion/react'
import SpecificDate from './SpecificDate'
import SpecificDayOfWeek from './SpecificDayOfWeek'
import XTimesPerDay from './XTimesPerDay'
import EveryXDays from './EveryXDays'
import Temporary from './Temporary'
import {
  DayOfWeekType,
  EveryXDaysType,
  HouseworkDetail,
  SpecificDateType,
  XTimesPerDayType,
} from '../../../lib/type'
import {
  X_TIMES_PER_DAY,
  EVERY_X_DAYS,
  SPECIFIC_DAY_OF_WEEK,
  SPECIFIC_DATE,
  TEMPORARY,
} from '../../../lib/constant'

const CustomFormControl: FC = ({ children }) => (
  <FormControl fullWidth css={formControl}>
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
          <SpecificDayOfWeek frequency={frequency as DayOfWeekType[]} />
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
