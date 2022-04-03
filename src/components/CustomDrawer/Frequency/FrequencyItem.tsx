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
  const { changeHouseworkFrequency, switchTemporaryStatus } = useDispatchHouse()
  const { currentHouse, houses } = useHouse()
  if (!currentHouse || !houses) return null

  const { frequency } = houses[currentHouse.id].housework[houseworkId]

  if (frequencyKey === 'temporary') {
    const handleRadioChange = async () => {
      await switchTemporaryStatus(houseworkId)
    }

    return (
      <FormControl fullWidth css={formControl}>
        <ListItemIcon>
          <Radio
            edge="start"
            checked={frequency.temporary}
            onChange={() => handleRadioChange()}
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

export default FrequencyItem

const formControl = css`
  flex-direction: row;
  padding: 8px 0px;
`
