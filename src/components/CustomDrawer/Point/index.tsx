/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { css } from '@emotion/react'
import { HOUSEWORK_DETAIL_ENUM, POINT_ENUM } from '../../../lib/constant'
import { EditingStatus, HouseworkDetail } from '../../../lib/type'

const KEY = HOUSEWORK_DETAIL_ENUM.POINT

type Props = {
  editingStatus: EditingStatus
  point: HouseworkDetail[typeof KEY]
  updateValue: (
    editingStatus: EditingStatus,
    key: typeof KEY,
    value: HouseworkDetail[typeof KEY]
  ) => Promise<void>
}

const Point: FC<Props> = ({ editingStatus, point, updateValue }) => {
  const { ONE, TWO, THREE, FOUR, FIVE } = POINT_ENUM

  const handleChange = async (event: SelectChangeEvent<typeof point>) => {
    const { value } = event.target
    const update = value as typeof point
    await updateValue(editingStatus, KEY, update)
  }

  return (
    <Select
      labelId="select-point"
      id="select-point"
      value={point}
      onChange={handleChange}
      css={select}
    >
      <MenuItem key={ONE} value={ONE}>
        {ONE}ポイント
      </MenuItem>
      <MenuItem key={TWO} value={TWO}>
        {TWO}ポイント
      </MenuItem>
      <MenuItem key={THREE} value={THREE}>
        {THREE}ポイント
      </MenuItem>
      <MenuItem key={FOUR} value={FOUR}>
        {FOUR}ポイント
      </MenuItem>
      <MenuItem key={FIVE} value={FIVE}>
        {FIVE}ポイント
      </MenuItem>
    </Select>
  )
}

export default Point

const select = css`
  width: 100%;
`
