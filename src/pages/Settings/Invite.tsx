import { Button, TextField, TextFieldProps } from '@mui/material'
import { FocusEvent, FC, useRef, useState } from 'react'
import { addInvitationToFirestore } from '../../handlers/firestoreHandler'
import { useUser } from '../../lib/hooks/store/currentUser'
import { useHouses } from '../../lib/hooks/store/houses'
import { useDispatchSnackbar } from '../../lib/hooks/store/snackbar'
import { Invitation } from '../../lib/type'

const Invite: FC = () => {
  const { houseId } = useHouses()
  const { uid } = useUser()
  const { openSnackbar } = useDispatchSnackbar()
  const emailRef = useRef<TextFieldProps>(null)
  const [invited, setInvited] = useState(false)
  if (!houseId) return null

  const { protocol, host } = window.location
  const url = `${protocol}//${host}/?houseId=${houseId}`

  const copyUrlToClipboard = async () => {
    await navigator.clipboard.writeText(url)
  }

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    event.target.select()
  }

  const handleClick = async () => {
    if (!emailRef.current) return
    const { value } = emailRef.current
    if (!value) return
    const invitation: Invitation = {
      inviteeEmail: value as string,
      inviterId: uid,
      status: 'invited',
    }
    await addInvitationToFirestore(houseId, invitation)
    await copyUrlToClipboard()
    openSnackbar('招待用URLをコピーしました')
    setInvited(true)
  }

  return (
    <>
      <TextField
        inputRef={emailRef}
        placeholder="追加したい人のメールアドレスを入力"
      />
      <Button onClick={() => handleClick()}>招待する</Button>
      {invited && <TextField value={url} onFocus={handleFocus} />}
      {invited && (
        <Button onClick={() => copyUrlToClipboard()}>URLをコピーする</Button>
      )}
    </>
  )
}
export default Invite
