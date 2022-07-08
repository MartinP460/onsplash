import { createContext, useContext, ReactNode } from 'react'
import { useUserData } from '@nhost/nextjs'
import { User } from '@nhost/core'

const UserContext = createContext<User | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
  const user = useUserData()

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export function useUserContext() {
  return useContext(UserContext)
}
