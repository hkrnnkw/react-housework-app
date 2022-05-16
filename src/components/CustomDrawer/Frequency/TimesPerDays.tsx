/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import { css } from '@emotion/react'
import { TimesPerDaysType } from '../../../lib/type'

const daysArray = new Array(90).fill(1) as number[]
const timesArray = new Array(10).fill(1) as number[]

type Props = {
  value: TimesPerDaysType
  handleChangeValue: (value: TimesPerDaysType) => Promise<void>
}

const TimesPerDays: FC<Props> = ({
  value: { times, days },
  handleChangeValue,
}) => {
  const handleChangeDays = async (event: SelectChangeEvent) => {
    const newValue: TimesPerDaysType = {
      times,
      days: Number(event.target.value),
    }
    await handleChangeValue(newValue)
  }

  const handleChangeTimes = async (event: SelectChangeEvent) => {
    const newValue: TimesPerDaysType = {
      times: Number(event.target.value),
      days,
    }
    await handleChangeValue(newValue)
  }

  return (
    <div css={container}>
      <Select
        labelId="select-x-days"
        id="select-x-days"
        value={days.toString()}
        onChange={handleChangeDays}
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
        onChange={handleChangeTimes}
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
`
