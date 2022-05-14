/** @jsxImportSource @emotion/react */
import { ChangeEvent, FC } from 'react'
import { TextField } from '@mui/material'
import { css } from '@emotion/react'
import { EditingStatus, HouseworkDetail, HouseworkId } from '../../../lib/type'
import { useDispatchHouse } from '../../../contexts/houses'
import Description from './Description'
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

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    const { DRAFT } = EDITING_STATUS_ENUM
    await changeTitle(DRAFT, houseworkId, value)
  }

  const handleBlur = async () => {
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
          onBlur={() => handleBlur()}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          css={textfield}
        />
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
