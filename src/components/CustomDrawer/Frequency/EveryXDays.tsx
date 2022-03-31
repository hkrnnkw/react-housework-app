/** @jsxImportSource @emotion/react */
import React, { FC, useState } from 'react'
import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import { css } from '@emotion/react'
import { FrequencyType } from '../../../lib/type'

const numArray = new Array(90).fill(1) as number[]

type Props = {
  frequency: FrequencyType['everyXDays']
}

const EveryXDays: FC<Props> = ({ frequency }) => {
  const [xDays, setXDays] = useState(frequency?.toString())

  const handleChange = (event: SelectChangeEvent) => {
    setXDays(event.target.value)
  }

  return (
    <div css={container}>
      <Select
        labelId="select-x-days"
        id="select-x-days"
        value={xDays}
        onChange={handleChange}
        css={select}
      >
        {numArray.map((num, i) => {
          const v = num + i
          return (
            <MenuItem key={v} value={v}>
              {v}
            </MenuItem>
          )
        })}
      </Select>
      <Typography>日ごと</Typography>
    </div>
  )
}

export default EveryXDays

const container = css`
  width: inherit;
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  column-gap: 1.3rem;
`

const select = css`
  width: 30%;
`
