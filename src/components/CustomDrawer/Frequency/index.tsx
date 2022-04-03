/** @jsxImportSource @emotion/react */
import React, { FC } from 'react'
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
import { useDispatchHouse } from '../../../contexts/houses'

type FrequencyItemProps = {
  isChecked: boolean
  frequencyKey: FrequencyKey
  houseworkId: string
}

const FrequencyItem: FC<FrequencyItemProps> = ({
  isChecked,
  frequencyKey,
  houseworkId,
  children,
}) => {
  const { changeHouseworkFrequency } = useDispatchHouse()

  const handleClick = async () => {
    await changeHouseworkFrequency(houseworkId, frequencyKey)
  }

  return (
    <FormControl fullWidth css={formControl}>
      <ListItemIcon onClick={() => handleClick()}>
        <Checkbox
          edge="start"
          checked={isChecked}
          inputProps={{ 'aria-labelledby': frequencyKey }}
        />
      </ListItemIcon>
      {children}
    </FormControl>
  )
}

type Props = {
  houseworkId: string
  frequency: FrequencyType
}

const Frequency: FC<Props> = ({ houseworkId, frequency }) => {
  const { switchTemporaryStatus } = useDispatchHouse()
  const { xTimesPerDay, everyXDays, daysOfWeek, specificDates, temporary } =
    frequency

  const handleRadioChange = async () => {
    await switchTemporaryStatus(houseworkId)
  }

  return (
    <>
      <FrequencyItem
        isChecked={!temporary && xTimesPerDay !== undefined}
        frequencyKey="xTimesPerDay"
        houseworkId={houseworkId}
      >
        <XTimesPerDay houseworkId={houseworkId} frequency={xTimesPerDay} />
      </FrequencyItem>
      <FrequencyItem
        isChecked={!temporary && everyXDays !== undefined}
        frequencyKey="everyXDays"
        houseworkId={houseworkId}
      >
        <EveryXDays frequency={everyXDays} />
      </FrequencyItem>
      <FrequencyItem
        isChecked={!temporary && daysOfWeek !== undefined}
        frequencyKey="daysOfWeek"
        houseworkId={houseworkId}
      >
        <SpecificDayOfWeek frequency={daysOfWeek} />
      </FrequencyItem>
      <FrequencyItem
        isChecked={!temporary && specificDates !== undefined}
        frequencyKey="specificDates"
        houseworkId={houseworkId}
      >
        <SpecificDate frequency={specificDates} />
      </FrequencyItem>
      <FormControl fullWidth css={formControl}>
        <ListItemButton>
          <ListItemIcon>
            <Radio
              checked={temporary}
              onChange={() => handleRadioChange()}
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
  flex-direction: row;
  padding: 8px 0px;
`
