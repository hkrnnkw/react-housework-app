/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AlertColor } from '@mui/material/Alert'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { INIT_SNACKBAR, stateSnackbar } from '../../states/snackbar'

export const useSnackbar = () => {
  const snackbar = useRecoilValue(stateSnackbar)
  return { ...snackbar }
}

export const useDispatchSnackbar = () => {
  const openSnackbar = useRecoilCallback(
    ({ set }) =>
      (message: string, severity: AlertColor = 'info') => {
        set(stateSnackbar, { open: true, message, severity })
      }
  )

  const closeSnackbar = useRecoilCallback(({ set }) => () => {
    set(stateSnackbar, INIT_SNACKBAR)
  })

  return {
    openSnackbar,
    closeSnackbar,
  }
}
