import { Button, TextField } from '@mui/material'
import { FC, useRef } from 'react'

const Invite: FC = () => {
  const emailInput = useRef('')

  const handleClick = () => {
    // emailInput.current
  }

  return (
    <>
      <TextField
        inputRef={emailInput}
        placeholder="追加したい人のメールアドレスを入力"
      />
      <Button onClick={handleClick}>招待を送る</Button>
    </>
  )
}
export default Invite
