/** @jsxImportSource @emotion/react */
import React, { ChangeEvent, FC, useState } from 'react'
import {
  Checkbox,
  FormControl,
  ListItemButton,
  ListItemIcon,
  Radio,
} from '@mui/material'
import { css } from '@emotion/react'
import SpecificDate from './SpecificDate'
import SpecificDayOfWeek from './SpecificDayOfWeek'
import XTimesPerDay from './XTimesPerDay'
import EveryXDays from './EveryXDays'
import Temporary from './Temporary'
import { FrequencyKey, FrequencyType } from '../../../lib/type'

type FrequencyItemProps = {
  isChecked: boolean
  frequencyKey: FrequencyKey
  onClick: (frequencyKey: FrequencyKey) => void
}

const FrequencyItem: FC<FrequencyItemProps> = ({
  isChecked,
  frequencyKey,
  onClick,
  children,
}) => (
  <FormControl fullWidth css={formControl}>
    <ListItemButton onClick={() => onClick(frequencyKey)}>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={isChecked}
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
  const { xTimesPerDay, everyXDays, daysOfWeek, specificDates, temporary } =
    frequency
  const [radioOn, setRadioOn] = useState(temporary ?? false)
  const [checkedStates, setCheckedStates] = useState({
    xTimesPerDay: !radioOn && xTimesPerDay !== undefined,
    everyXDays: !radioOn && everyXDays !== undefined,
    daysOfWeek: !radioOn && daysOfWeek !== undefined,
    specificDates: !radioOn && specificDates !== undefined,
  })

  const handleCheckboxChange = (frequencyKey: FrequencyKey) => {
    const newCheckedStates = { ...checkedStates }
    newCheckedStates[frequencyKey] = !newCheckedStates[frequencyKey]
    setCheckedStates(newCheckedStates)
    const {
      xTimesPerDay: condA,
      everyXDays: condB,
      daysOfWeek: condC,
      specificDates: condD,
    } = newCheckedStates
    if (condA || condB || condC || condD) setRadioOn(false)
  }

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRadioOn(event.target.checked)
    setCheckedStates({
      xTimesPerDay: false,
      everyXDays: false,
      daysOfWeek: false,
      specificDates: false,
    })
  }

  return (
    <>
      <FrequencyItem
        isChecked={checkedStates.xTimesPerDay}
        frequencyKey="xTimesPerDay"
        onClick={handleCheckboxChange}
      >
        <XTimesPerDay frequency={xTimesPerDay} />
      </FrequencyItem>
      <FrequencyItem
        isChecked={checkedStates.everyXDays}
        frequencyKey="everyXDays"
        onClick={handleCheckboxChange}
      >
        <EveryXDays frequency={everyXDays} />
      </FrequencyItem>
      <FrequencyItem
        isChecked={checkedStates.daysOfWeek}
        frequencyKey="daysOfWeek"
        onClick={handleCheckboxChange}
      >
        <SpecificDayOfWeek frequency={daysOfWeek} />
      </FrequencyItem>
      <FrequencyItem
        isChecked={checkedStates.specificDates}
        frequencyKey="specificDates"
        onClick={handleCheckboxChange}
      >
        <SpecificDate frequency={specificDates} />
      </FrequencyItem>
      <FormControl fullWidth css={formControl}>
        <ListItemButton>
          <ListItemIcon>
            <Radio
              checked={radioOn}
              onChange={(e) => handleRadioChange(e)}
              value="a"
              name="radio-buttons"
              inputProps={{ 'aria-label': 'A' }}
            />
          </ListItemIcon>
          <Temporary />
        </ListItemButton>
      </FormControl>
    </>
  )
}

export default Frequency

const formControl = css`
  padding: 8px 16px;
`
