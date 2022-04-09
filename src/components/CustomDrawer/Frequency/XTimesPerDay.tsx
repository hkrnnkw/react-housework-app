/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import { css } from '@emotion/react'
import { useDispatchHouse } from '../../../contexts/houses'
import { FrequencyType } from '../../../lib/type'

const numArray = new Array(10).fill(1) as number[]

type Props = {
  frequency: FrequencyType['xTimesPerDay']
  categoryId: string
  houseworkId: string
}

const XTimesPerDay: FC<Props> = ({ frequency, categoryId, houseworkId }) => {
  const { changeXTimesPerDay } = useDispatchHouse()
  const xTime = frequency?.toString() ?? ''

  const handleChange = async (event: SelectChangeEvent) => {
    await changeXTimesPerDay(categoryId, houseworkId, event.target.value)
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
  width: 100%;
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  column-gap: 1.3rem;
`

const select = css`
  width: 40%;
`
