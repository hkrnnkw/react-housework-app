/** @jsxImportSource @emotion/react */
import React, { FC } from 'react'
import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import { css } from '@emotion/react'
import { FrequencyType } from '../../../lib/type'
import { useDispatchHouse } from '../../../contexts/houses'

const numArray = new Array(10).fill(1) as number[]

type Props = {
  houseworkId: string
  frequency: FrequencyType['xTimesPerDay']
}

const XTimesPerDay: FC<Props> = ({ houseworkId, frequency }) => {
  const { changeHouseworkFrequency } = useDispatchHouse()

  const xTime = frequency?.toString() ?? undefined

  const handleChange = async (event: SelectChangeEvent) => {
    const { value } = event.target
    await changeHouseworkFrequency(houseworkId, 'xTimesPerDay', value)
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
