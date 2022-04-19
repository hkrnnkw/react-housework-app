/** @jsxImportSource @emotion/react */
import { ChangeEvent, FC, useRef, useState } from 'react'
import { TextField } from '@mui/material'
import { css } from '@emotion/react'
import { HouseworkDetail, HouseworkId } from '../../../lib/type'
import { useDispatchHouse } from '../../../contexts/houses'
import SaveButton from './SaveButton'

type Props = {
  houseworkId: HouseworkId
  description: HouseworkDetail['description']
}

const Description: FC<Props> = ({ houseworkId, description }) => {
  const { changeDescription } = useDispatchHouse()
  const value = useRef(description)
  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    value.current = event.currentTarget.value
  }

  const handleClick = async () => {
    await changeDescription(houseworkId, value.current)
  }

  const handleBlur = async () => {
    setIsEditing(false)
    if (description === value.current) return
    await changeDescription(houseworkId, value.current)
  }

  return (
    <div css={container}>
      <TextField
        id="description"
        variant="standard"
        placeholder={description || '説明がありません'}
        defaultValue={value.current}
        onFocus={() => setIsEditing(true)}
        onBlur={() => handleBlur()}
        onChange={handleChange}
        multiline
        maxRows={4}
        css={textarea}
      />
      {isEditing && <SaveButton handleClick={handleClick} />}
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
