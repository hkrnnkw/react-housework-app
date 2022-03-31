/** @jsxImportSource @emotion/react */
import React, { FC } from 'react'
import {
  Checkbox,
  FormControl,
  ListItemButton,
  ListItemIcon,
} from '@mui/material'
import { css } from '@emotion/react'
import SpecificDate from './SpecificDate'
import SpecificDayOfWeek from './SpecificDayOfWeek'
import XTimesPerDay from './XTimesPerDay'
import EveryXDays from './EveryXDays'
import Temporary from './Temporary'
import { FrequencyType } from '../../../lib/type'

type FrequencyItemProps = {
  defaultChecked: boolean
  frequencyKey: keyof FrequencyType
}

const FrequencyItem: FC<FrequencyItemProps> = ({
  defaultChecked,
  frequencyKey,
  children,
}) => (
  <FormControl fullWidth css={formControl}>
    <ListItemButton onClick={() => console.log('temp log', frequencyKey)}>
      <ListItemIcon>
        <Checkbox
          edge="start"
          defaultChecked={defaultChecked}
          inputProps={{ 'aria-labelledby': frequencyKey }}
        />
      </ListItemIcon>
      {children}
    </ListItemButton>
  </FormControl>
)

type Props = {
  frequency: FrequencyType
}

const Frequency: FC<Props> = ({ frequency }) => {
  const { xTimesPerDay, everyXDays, daysOfWeek, specificDates } = frequency
  return (
    <>
      <FrequencyItem
        defaultChecked={xTimesPerDay !== undefined}
        frequencyKey="xTimesPerDay"
      >
        <XTimesPerDay frequency={xTimesPerDay} />
      </FrequencyItem>
      <FrequencyItem
        defaultChecked={everyXDays !== undefined}
        frequencyKey="everyXDays"
      >
        <EveryXDays frequency={everyXDays} />
      </FrequencyItem>
      <FrequencyItem
        defaultChecked={daysOfWeek !== undefined}
        frequencyKey="daysOfWeek"
      >
        <SpecificDayOfWeek frequency={daysOfWeek} />
      </FrequencyItem>
      <FrequencyItem
        defaultChecked={specificDates !== undefined}
        frequencyKey="specificDates"
      >
        <SpecificDate frequency={specificDates} />
      </FrequencyItem>
      <Temporary />
    </>
  )
}

export default Frequency

const formControl = css`
  padding: 8px 16px;
`
