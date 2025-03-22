'use client'

// context/AppContext.js
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

interface AppContextProps {
  fontFamily: string
  fontSize: string
  setFontFamily: (font: string) => void
  setFontSize: (size: string) => void
}

export const AppContext = createContext<AppContextProps | undefined>(undefined)

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [fontFamily, setFontFamily] = useState('font-sans')
  const [fontSize, setFontSize] = useState('text-base')

  useEffect(() => {
    const savedFontFamily = localStorage.getItem('fontFamily') || 'font-sans'
    const savedFontSize = localStorage.getItem('fontSize') || 'text-base'
    setFontFamily(savedFontFamily)
    setFontSize(savedFontSize)
  }, [])

  return (
    <AppContext.Provider
      value={{ fontFamily, fontSize, setFontFamily, setFontSize }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
