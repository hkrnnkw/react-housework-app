import React, { useContext, createContext, ReactChild } from 'react'
import { State, initialState } from './constants'
import useHouseForContext from './hooks'

export * from './constants'

type DispatchContextType = Omit<ReturnType<typeof useHouseForContext>, 'state'>

// 参照用context
export const HouseContext = createContext<State>(initialState)
// 更新用context
export const HouseDispatchContext = createContext<DispatchContextType>(
  {} as DispatchContextType
)

export const HouseProvider = ({
  children,
}: {
  children: ReactChild
}): JSX.Element => {
  const { state, ...dispatchActions } = useHouseForContext()

  return (
    <HouseContext.Provider value={{ ...state }}>
      <HouseDispatchContext.Provider value={{ ...dispatchActions }}>
        {children}
      </HouseDispatchContext.Provider>
    </HouseContext.Provider>
  )
}

export const useHouse = (): State => useContext(HouseContext)

export const useDispatchHouse = (): DispatchContextType =>
  useContext(HouseDispatchContext)
