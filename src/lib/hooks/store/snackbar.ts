/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { INIT_SNACKBAR, stateSnackbar } from '../../states/snackbar'

export const useSnackbar = () => {
  const snackbar = useRecoilValue(stateSnackbar)
  return {
    snackbar,
  }
}

export const useDispatchSnackbar = () => {
  const openSnackbar = useRecoilCallback(({ set }) => (message: string) => {
    set(stateSnackbar, { open: true, message })
  })

  const closeSnackbar = useRecoilCallback(({ set }) => () => {
    set(stateSnackbar, INIT_SNACKBAR)
  })

  return {
    openSnackbar,
    closeSnackbar,
  }
}
