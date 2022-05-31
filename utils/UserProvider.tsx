import React, { createContext, useContext } from 'react'
import { useUserData } from '@nhost/nextjs'

type UserProviderProps = {
  children: React.ReactNode
}

const UserContext = createContext<any | null>(null)

export function UserProvider({ children }: UserProviderProps) {
  const user = useUserData()

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export function useUserContext() {
  return useContext(UserContext)
}
