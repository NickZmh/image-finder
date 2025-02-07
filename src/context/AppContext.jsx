import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    category: '',
    imageUrl: '',
    customCategory: '',
  })

  return (
    <AppContext.Provider value={{ userData, setUserData }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
