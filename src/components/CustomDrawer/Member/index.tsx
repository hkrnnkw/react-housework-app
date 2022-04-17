/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import {
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { css } from '@emotion/react'
import { HouseworkDetail, HouseworkId } from '../../../lib/type'
import { useDispatchHouse } from '../../../contexts/houses'
import { NOT_SET, State as UserState } from '../../../contexts/user/constants'

type Props = {
  houseworkId: HouseworkId
  memberId: HouseworkDetail['memberId']
  members: UserState[]
}

const Member: FC<Props> = ({ houseworkId, memberId, members }) => {
  const { changeMemberId } = useDispatchHouse()

  const handleChange = async (event: SelectChangeEvent<typeof memberId>) => {
    const { value } = event.target
    const update = value === NOT_SET ? null : value
    await changeMemberId(houseworkId, update)
  }

  return (
    <>
      <ListItemText primary="担当" />
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
    </>
  )
}

export default Member

const select = css`
  width: 100%;
`
