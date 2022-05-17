/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { css } from '@emotion/react'
import { Editing, HouseworkDetail } from '../../../lib/type'
import { useDispatchHouse } from '../../../contexts/houses'
import { CurrentUser } from '../../../lib/states/currentUser'
import { NOT_SET } from '../../../lib/constant'

type Props = {
  editing: Editing
  memberId: HouseworkDetail['memberId']
  members: CurrentUser[]
}

const Member: FC<Props> = ({ editing, memberId, members }) => {
  const { updateHouseworkDetail } = useDispatchHouse()

  const handleChange = async (event: SelectChangeEvent<typeof memberId>) => {
    const { value } = event.target
    const update = value === NOT_SET ? null : value
    await updateHouseworkDetail(editing, 'memberId', update)
  }

  return (
    <Select
      labelId="select-member"
      id="select-member"
      value={memberId ?? NOT_SET}
      onChange={handleChange}
      css={select}
    >
      {members.map((member) => (
        <MenuItem key={member.uid} value={member.uid}>
          {member.displayName}
        </MenuItem>
      ))}
      <MenuItem key="not_set" value={NOT_SET}>
        {NOT_SET}
      </MenuItem>
    </Select>
  )
}

export default Member

const select = css`
  width: 100%;
`
