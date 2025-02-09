import React, { ReactNode, useState } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { AppContext, UserData } from '../context'
import { MemoryRouter } from 'react-router-dom'

interface MockAppProviderProps {
  children: ReactNode
  initialUserData?: UserData
}

const MockAppProvider: React.FC<MockAppProviderProps> = ({
  children,
  initialUserData = {
    name: '',
    surname: '',
    category: 'animals',
    imageUrl: '',
    customCategory: '',
  },
}) => {
  const [userData, setUserData] = useState<UserData>(initialUserData)

  return (
    <AppContext.Provider value={{ userData, setUserData }}>
      {children}
    </AppContext.Provider>
  )
}

export const renderWithProvider = (
  ui: React.ReactElement,
  {
    initialUserData,
    ...renderOptions
  }: { initialUserData?: UserData } & Omit<RenderOptions, 'wrapper'> = {},
) => {
  const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <MockAppProvider initialUserData={initialUserData}>
      <MemoryRouter>{children}</MemoryRouter>
    </MockAppProvider>
  )
  return render(ui, { wrapper: Wrapper, ...renderOptions })
}
