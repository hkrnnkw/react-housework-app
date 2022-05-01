/** @jsxImportSource @emotion/react */
import { ChangeEvent, FC, useRef, useState } from 'react'
import { TextField } from '@mui/material'
import { css } from '@emotion/react'
import { HouseworkDetail, HouseworkId } from '../../../lib/type'
import { useDispatchHouse } from '../../../contexts/houses'
import Description from './Description'
import SaveButton from '../SaveButton'

type Props = {
  houseworkId: HouseworkId
  title: HouseworkDetail['title']
  description: HouseworkDetail['description']
}

const Title: FC<Props> = ({ houseworkId, title, description }) => {
  const { changeTitle } = useDispatchHouse()
  const value = useRef(title)
  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    value.current = event.currentTarget.value
  }

  const handleClick = async () => {
    await changeTitle(houseworkId, value.current)
  }

  const handleBlur = async () => {
    setIsEditing(false)
    if (title === value.current) return
    await changeTitle(houseworkId, value.current)
  }

  return (
    <>
      <div css={container}>
        <TextField
          id="title"
          variant="standard"
          placeholder={title}
          defaultValue={value.current}
          onFocus={() => setIsEditing(true)}
          onBlur={() => handleBlur()}
          onChange={handleChange}
          css={textfield}
        />
        {isEditing && <SaveButton handleClick={handleClick} />}
      </div>
      <Description houseworkId={houseworkId} description={description} />
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
