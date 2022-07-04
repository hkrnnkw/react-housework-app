import { atom } from 'recoil'
import { AlertColor } from '@mui/material/Alert'

export type SnackbarType = {
  open: boolean
  message: string
  severity: AlertColor
}

export const INIT_SNACKBAR: SnackbarType = {
  open: false,
  message: '',
  severity: 'info',
} as const

export const stateSnackbar = atom<SnackbarType>({
  key: 'stateSnackbar',
  default: INIT_SNACKBAR,
})
