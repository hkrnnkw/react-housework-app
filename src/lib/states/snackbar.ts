import { atom } from 'recoil'

export type SnackbarType = {
  open: boolean
  message: string
}

export const INIT_SNACKBAR: SnackbarType = { open: false, message: '' } as const

export const stateSnackbar = atom<SnackbarType>({
  key: 'stateSnackbar',
  default: INIT_SNACKBAR,
})
