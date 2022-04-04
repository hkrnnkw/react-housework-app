/** @jsxImportSource @emotion/react */
import React, { FC } from 'react'
import { Checkbox, FormControl, ListItemIcon, Radio } from '@mui/material'
import { css } from '@emotion/react'
import { FrequencyType } from '../../../lib/type'
import { useDispatchHouse, useHouse } from '../../../contexts/houses'

type Props = {
  frequencyKey: keyof FrequencyType
  houseworkId: string
}

const FrequencyItem: FC<Props> = ({ frequencyKey, houseworkId, children }) => {
  const {
    changeXTimesPerDay,
    changeEveryXDays,
    changeDaysOfWeek,
    changeSpecificDate,
    switchTemporaryStatus,
  } = useDispatchHouse()
  const { currentHouse, houses } = useHouse()
  if (!currentHouse || !houses) return null

  const { frequency } = houses[currentHouse.id].housework[houseworkId]

  const handleChangeFrequency = async () => {
    switch (frequencyKey) {
      case 'xTimesPerDay':
        await changeXTimesPerDay(houseworkId)
        break
      case 'everyXDays':
        await changeEveryXDays(houseworkId)
        break
      case 'daysOfWeek':
        await changeDaysOfWeek(houseworkId)
        break
      case 'specificDates':
        await changeSpecificDate(houseworkId)
        break
      default:
        await switchTemporaryStatus(houseworkId)
        break
    }
  }

  if (frequencyKey === 'temporary') {
    return (
      <FormControl fullWidth css={formControl}>
        <ListItemIcon>
          <Radio
            edge="start"
            checked={frequency.temporary}
            onChange={() => handleChangeFrequency()}
            value="temporary"
            name="radio-of-temporary"
            inputProps={{ 'aria-label': 'temporary' }}
          />
        </ListItemIcon>
        {children}
      </FormControl>
    )
  }

  const isChecked =
    !frequency.temporary && frequency[frequencyKey] !== undefined

  return (
    <FormControl fullWidth css={formControl}>
      <ListItemIcon onClick={() => handleChangeFrequency()}>
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

export default FrequencyItem

const formControl = css`
  flex-direction: row;
  padding: 8px 0px;
`
