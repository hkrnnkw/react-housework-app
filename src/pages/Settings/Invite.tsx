import { Button, TextField, TextFieldProps } from '@mui/material'
import { FC, useRef } from 'react'
import { addInvitationToFirestore } from '../../handlers/firestoreHandler'
import { useUser } from '../../lib/hooks/store/currentUser'
import { useHouses } from '../../lib/hooks/store/houses'
import { Invitation } from '../../lib/type'

const Invite: FC = () => {
  const { houseId } = useHouses()
  const { uid } = useUser()
  const emailRef = useRef<TextFieldProps>(null)
  if (!houseId) return null

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
  }

  return (
    <>
      <TextField
        inputRef={emailRef}
        placeholder="追加したい人のメールアドレスを入力"
      />
      <Button onClick={() => handleClick()}>招待を送る</Button>
    </>
  )
}
export default Invite
