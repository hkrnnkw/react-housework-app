import { Button, TextField, TextFieldProps } from '@mui/material'
import { FocusEvent, FC, useRef, useState } from 'react'
import { addInvitationToFirestore } from '../../handlers/firestoreHandler'
import { useUser } from '../../lib/hooks/store/currentUser'
import { useDispatchHouses, useHouses } from '../../lib/hooks/store/houses'
import { useDispatchSnackbar } from '../../lib/hooks/store/snackbar'
import { House, Invitation } from '../../lib/type'

const Invite: FC = () => {
  const { allHouses, houseId, members } = useHouses()
  const { updateHouseOnAll } = useDispatchHouses()
  const { uid } = useUser()
  const { openSnackbar } = useDispatchSnackbar()
  const emailRef = useRef<TextFieldProps>(null)
  const [invited, setInvited] = useState(false)
  if (!allHouses || !houseId || !members) return null

  const { protocol, host } = window.location
  const url = `${protocol}//${host}/?houseId=${houseId}`

  const copyUrlToClipboard = async () => {
    await navigator.clipboard.writeText(url)
    openSnackbar('招待用URLをコピーしました')
  }

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    event.target.select()
  }

  const handleClick = async () => {
    if (!emailRef.current) return
    const inviteeEmail = emailRef.current.value
    if (!inviteeEmail || typeof inviteeEmail !== 'string') return

    const currentHouse = { ...allHouses[houseId] }
    const { memberIds, invitations } = { ...currentHouse }
    const i = memberIds.findIndex((id) => members[id].email === inviteeEmail)
    if (i > -1) {
      openSnackbar('すでにメンバーになっています')
      return
    }
    const key = inviteeEmail.replace(/\./g, '_')
    if (invitations[key] && invitations[key].status === 'invited') {
      openSnackbar('すでに招待しています')
      return
    }

    const newInvitation: Invitation = {
      inviteeEmail,
      inviterId: uid,
      status: 'invited',
    }
    const newInvitations: House['invitations'] = {
      ...invitations,
      [key]: newInvitation,
    }
    updateHouseOnAll({ ...currentHouse, invitations: newInvitations })
    try {
      await addInvitationToFirestore(houseId, newInvitation)
      await copyUrlToClipboard()
      setInvited(true)
    } catch (e) {
      updateHouseOnAll(currentHouse)
    }
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
