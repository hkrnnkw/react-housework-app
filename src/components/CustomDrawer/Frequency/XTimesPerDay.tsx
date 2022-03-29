/** @jsxImportSource @emotion/react */
import React, { FC, useState } from 'react'
import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import { css } from '@emotion/react'
import { XTimesPerDayType } from '../../../lib/type'

const numArray = new Array(10).fill(1) as number[]

type Props = {
  frequency: XTimesPerDayType
}

const XTimesPerDay: FC<Props> = ({ frequency: { x } }) => {
  const [xTime, setXTime] = useState(x.toString())

  const handleChange = (event: SelectChangeEvent) => {
    setXTime(event.target.value)
  }

  return (
    <div css={container}>
      <Typography>1日に</Typography>
      <Select
        labelId="select-x-times"
        id="select-x-times"
        value={xTime}
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
      <Typography>回</Typography>
    </div>
  )
}

export default XTimesPerDay

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
