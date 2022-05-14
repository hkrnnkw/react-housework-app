/** @jsxImportSource @emotion/react */
import { ChangeEvent, FC } from 'react'
import { TextField } from '@mui/material'
import { css } from '@emotion/react'
import { Editing, HouseworkDetail } from '../../../lib/type'
import { useDispatchHouse } from '../../../contexts/houses'
import { EDITING_STATUS_ENUM } from '../../../lib/constant'

type Props = {
  editing: Editing
  description: HouseworkDetail['description']
}

const Description: FC<Props> = ({ editing, description }) => {
  const { changeDescription } = useDispatchHouse()
  const { houseworkId, editingStatus } = editing

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    const { DRAFT } = EDITING_STATUS_ENUM
    await changeDescription(DRAFT, houseworkId, value)
  }

  const handleBlur = async () => {
    await changeDescription(editingStatus, houseworkId, description)
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
