/** @jsxImportSource @emotion/react */
import { ChangeEvent, FC, useState } from 'react'
import { TextField } from '@mui/material'
import { css } from '@emotion/react'
import { EditingStatus, HouseworkDetail, HouseworkId } from '../../../lib/type'
import { useDispatchHouse } from '../../../contexts/houses'
import SaveButton from '../SaveButton'
import { EDITING_STATUS_ENUM } from '../../../lib/constant'

type Props = {
  editingStatus: EditingStatus
  houseworkId: HouseworkId
  description: HouseworkDetail['description']
}

const Description: FC<Props> = ({
  editingStatus,
  houseworkId,
  description,
}) => {
  const { changeDescription } = useDispatchHouse()
  const [isEditing, setIsEditing] = useState(false)

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    const { DRAFT } = EDITING_STATUS_ENUM
    await changeDescription(DRAFT, houseworkId, value)
  }

  const handleClick = async () => {
    await changeDescription(editingStatus, houseworkId, description)
  }

  const handleBlur = async () => {
    setIsEditing(false)
    await changeDescription(editingStatus, houseworkId, description)
  }

  return (
    <div css={container}>
      <TextField
        id="description"
        variant="standard"
        placeholder={description || '説明がありません'}
        defaultValue={description}
        onFocus={() => setIsEditing(true)}
        onBlur={() => handleBlur()}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        multiline
        maxRows={4}
        css={textarea}
      />
      {isEditing && (
        <SaveButton disabled={!description?.length} handleClick={handleClick} />
      )}
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
