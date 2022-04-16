/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import { css } from '@emotion/react'
import { useDispatchHouse } from '../../../contexts/houses'
import { FrequencyType } from '../../../lib/type'

const daysArray = new Array(90).fill(1) as number[]
const timesArray = new Array(10).fill(1) as number[]

type Props = {
  frequency: FrequencyType['values']['timesPerDays']
  categoryId: string
  taskId: string
}

const TimesPerDays: FC<Props> = ({ frequency, categoryId, taskId }) => {
  const { changeFrequencyValue, initTimesPerDays } = useDispatchHouse()
  const { times, days } = frequency ?? initTimesPerDays()

  const handleDaysChange = async (event: SelectChangeEvent) => {
    const value: typeof frequency = {
      times,
      days: Number(event.target.value),
    }
    await changeFrequencyValue(categoryId, taskId, value)
  }

  const handleTimesChange = async (event: SelectChangeEvent) => {
    const value: typeof frequency = {
      times: Number(event.target.value),
      days,
    }
    await changeFrequencyValue(categoryId, taskId, value)
  }

  return (
    <div css={container}>
      <Select
        labelId="select-x-days"
        id="select-x-days"
        value={days.toString()}
        onChange={handleDaysChange}
        css={select}
      >
        {daysArray.map((num, i) => {
          const v = num + i
          return (
            <MenuItem key={v} value={v}>
              {v}
            </MenuItem>
          )
        })}
      </Select>
      <Typography>日ごとに</Typography>
      <Select
        labelId="select-x-times"
        id="select-x-times"
        value={times.toString()}
        onChange={handleTimesChange}
        css={select}
      >
        {timesArray.map((num, i) => {
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

export default TimesPerDays

const container = css`
  width: 100%;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  column-gap: 1.1rem;
`

const select = css`
  width: 25%;
  padding: 8px 0px;
`
