/** @jsxImportSource @emotion/react */
import { ChangeEvent, FC } from 'react'
import { TextField } from '@mui/material'
import { css } from '@emotion/react'
import { Editing, HouseworkDetail } from '../../../lib/type'
import { useDispatchHouse } from '../../../contexts/houses'
import Description from './Description'
import { EDITING_STATUS_ENUM } from '../../../lib/constant'

type Props = {
  editing: Editing
  title: HouseworkDetail['title']
  description: HouseworkDetail['description']
}

const Title: FC<Props> = ({ editing, title, description }) => {
  const { updateHouseworkDetail } = useDispatchHouse()
  const { houseworkId } = editing

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    const { DRAFT } = EDITING_STATUS_ENUM
    const drafting: Editing = { editingStatus: DRAFT, houseworkId }
    await updateHouseworkDetail(drafting, 'title', value)
  }

  const handleBlur = async () => {
    await updateHouseworkDetail(editing, 'title', title)
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
      <Description editing={editing} description={description} />
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
