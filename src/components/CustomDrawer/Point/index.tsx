/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { css } from '@emotion/react'
import { POINT_ENUM } from '../../../lib/constant'
import { Editing, HouseworkDetail } from '../../../lib/type'
import { useDispatchHouse } from '../../../contexts/houses'

type Props = {
  editing: Editing
  point: HouseworkDetail['point']
}

const Point: FC<Props> = ({ editing, point }) => {
  const { updateHouseworkDetail } = useDispatchHouse()
  const { ONE, TWO, THREE, FOUR, FIVE } = POINT_ENUM

  const handleChange = async (event: SelectChangeEvent<typeof point>) => {
    const { value } = event.target
    const update = value as typeof point
    await updateHouseworkDetail(editing, 'point', update)
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
