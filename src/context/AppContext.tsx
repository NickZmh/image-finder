import { createContext, useContext, useState, ReactNode } from 'react'

export interface UserData {
  name: string
  surname: string
  category: string
  imageUrl: string
  customCategory: string
}

interface AppContextType {
  userData: UserData
  setUserData: React.Dispatch<React.SetStateAction<UserData>>
}

export const initialUserData: UserData = {
  name: '',
  surname: '',
  category: '',
  imageUrl: '',
  customCategory: '',
}

export const AppContext = createContext<AppContextType>({
  userData: initialUserData,
  setUserData: () => {},
})

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState(initialUserData)

  return (
    <AppContext.Provider value={{ userData, setUserData }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
