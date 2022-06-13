/** @jsxImportSource @emotion/react */
import { ChangeEvent, FC } from 'react'
import { TextField } from '@mui/material'
import { css } from '@emotion/react'
import { EditingStatus, HouseworkDetail } from '../../../lib/type'
import {
  EDITING_STATUS_ENUM,
  HOUSEWORK_DETAIL_ENUM,
} from '../../../lib/constant'

const KEY = HOUSEWORK_DETAIL_ENUM.DESCRIPTION

type Props = {
  editingStatus: EditingStatus
  description: HouseworkDetail[typeof KEY]
  updateValue: (
    editingStatus: EditingStatus,
    key: typeof KEY,
    value: HouseworkDetail[typeof KEY]
  ) => Promise<void>
}

const Description: FC<Props> = ({
  editingStatus,
  description,
  updateValue,
}) => {
  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    const { DRAFT } = EDITING_STATUS_ENUM
    await updateValue(DRAFT, KEY, value)
  }

  const handleBlur = async () => {
    await updateValue(editingStatus, KEY, description)
  }

  return (
    <div css={container}>
      <TextField
        id="description"
        variant="standard"
        placeholder={description || '説明がありません'}
        defaultValue={description}
        onBlur={() => handleBlur()}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        multiline
        maxRows={4}
        css={textarea}
      />
    </div>
  )
}

export default Description

const container = css`
  width: 100%;
  display: flex;
  align-items: flex-end;
`

const textarea = css`
  width: 100%;
`
