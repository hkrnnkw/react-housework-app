/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { Button } from '@mui/material'
import { css } from '@emotion/react'

type Props = {
  disabled: boolean | undefined
  handleClick: () => void
}

const SaveButton: FC<Props> = ({ disabled, handleClick }) => (
  <Button
    onClick={handleClick}
    variant="contained"
    css={button}
    disabled={disabled}
  >
    保存
  </Button>
)

export default SaveButton

const button = css`
  width: 64px;
  height: 32px;
`
