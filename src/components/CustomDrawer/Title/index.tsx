/** @jsxImportSource @emotion/react */
import { ChangeEvent, FC } from 'react'
import { TextField } from '@mui/material'
import { css } from '@emotion/react'
import { EditingStatus, HouseworkDetail } from '../../../lib/type'
import {
  EDITING_STATUS_ENUM,
  HOUSEWORK_DETAIL_ENUM,
} from '../../../lib/constant'

const KEY = HOUSEWORK_DETAIL_ENUM.TITLE

type Props = {
  editingStatus: EditingStatus
  title: HouseworkDetail[typeof KEY]
  updateValue: (
    editingStatus: EditingStatus,
    key: typeof KEY,
    value: HouseworkDetail[typeof KEY]
  ) => Promise<void>
}

const Title: FC<Props> = ({ editingStatus, title, updateValue }) => {
  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    const { DRAFT } = EDITING_STATUS_ENUM
    await updateValue(DRAFT, KEY, value)
  }

  const handleBlur = async () => {
    await updateValue(editingStatus, KEY, title)
  }

  return (
    <div css={container}>
      <TextField
        id="title"
        variant="standard"
        placeholder={title}
        defaultValue={title}
        onBlur={() => handleBlur()}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        css={textfield}
      />
    </div>
  )
}

export default Title

const container = css`
  width: 100%;
  display: flex;
  align-items: flex-end;
`

const textfield = css`
  width: 100%;
`
