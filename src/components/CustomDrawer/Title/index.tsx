/** @jsxImportSource @emotion/react */
import { ChangeEvent, FC, useState } from 'react'
import { TextField } from '@mui/material'
import { css } from '@emotion/react'
import { EditingStatus, HouseworkDetail, HouseworkId } from '../../../lib/type'
import { useDispatchHouse } from '../../../contexts/houses'
import Description from './Description'
import SaveButton from '../SaveButton'
import { EDITING_STATUS_ENUM } from '../../../lib/constant'

type Props = {
  editingStatus: EditingStatus
  houseworkId: HouseworkId
  title: HouseworkDetail['title']
  description: HouseworkDetail['description']
}

const Title: FC<Props> = ({
  editingStatus,
  houseworkId,
  title,
  description,
}) => {
  const { changeTitle } = useDispatchHouse()
  const [isEditing, setIsEditing] = useState(false)

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    const { DRAFT } = EDITING_STATUS_ENUM
    await changeTitle(DRAFT, houseworkId, value)
  }

  const handleClick = async () => {
    await changeTitle(editingStatus, houseworkId, title)
  }

  const handleBlur = async () => {
    setIsEditing(false)
    await changeTitle(editingStatus, houseworkId, title)
  }

  return (
    <>
      <div css={container}>
        <TextField
          id="title"
          variant="standard"
          placeholder={title}
          defaultValue={title}
          onFocus={() => setIsEditing(true)}
          onBlur={() => handleBlur()}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          css={textfield}
        />
        {isEditing && (
          <SaveButton disabled={!title.length} handleClick={handleClick} />
        )}
      </div>
      <Description
        editingStatus={editingStatus}
        houseworkId={houseworkId}
        description={description}
      />
    </>
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
