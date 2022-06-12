/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { css } from '@emotion/react'
import {
  EditingStatus,
  HouseworkDetail,
  Member as MemberType,
} from '../../../lib/type'
import { HOUSEWORK_DETAIL_ENUM, NOT_SET } from '../../../lib/constant'

const KEY = HOUSEWORK_DETAIL_ENUM.MEMBER_ID

type Props = {
  editingStatus: EditingStatus
  memberId: HouseworkDetail[typeof KEY]
  members: MemberType[]
  updateValue: (
    editingStatus: EditingStatus,
    key: typeof KEY,
    value: HouseworkDetail[typeof KEY]
  ) => Promise<void>
}

const Member: FC<Props> = ({
  editingStatus,
  memberId,
  members,
  updateValue,
}) => {
  const handleChange = async (event: SelectChangeEvent<typeof memberId>) => {
    const { value } = event.target
    const update = value === NOT_SET ? null : value
    await updateValue(editingStatus, KEY, update)
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
