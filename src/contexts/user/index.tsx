import { createContext, ReactChild, useContext } from 'react'
import { State, initialState } from './constants'
import useUserForContext from './hooks'

export * from './constants'

type DispatchContextType = Omit<ReturnType<typeof useUserForContext>, 'state'>

// 参照用context
export const UserContext = createContext<State>(initialState)
// 更新用context
export const UserDispatchContext = createContext<DispatchContextType>(
  {} as DispatchContextType
)

export const UserProvider = ({
  children,
}: {
  children: ReactChild
}): JSX.Element => {
  const { state, ...dispatchActions } = useUserForContext()

  return (
    <UserContext.Provider value={{ ...state }}>
      <UserDispatchContext.Provider value={{ ...dispatchActions }}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  )
}

export const useUser = (): State => useContext(UserContext)

export const useDispatchUser = (): DispatchContextType =>
  useContext(UserDispatchContext)
