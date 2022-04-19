/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { Button } from '@mui/material'
import { css } from '@emotion/react'

type Props = {
  handleClick: () => void
}

const SaveButton: FC<Props> = ({ handleClick }) => (
  <Button onClick={handleClick} variant="contained" css={button}>
    保存
  </Button>
)

export default SaveButton

const button = css`
  width: 48px;
  height: 32px;
`
