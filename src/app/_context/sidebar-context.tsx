'use client'
import { createContext, ReactNode, useContext } from 'react'
import { useBoolean } from '@/hooks/use-boolean'

const SidebarContext = createContext({
  isSidebarOpen: false,
  closeSidebar: () => {},
  openSidebar: () => {},
})

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const { value: isSidebarOpen, onFalse: closeSidebar, onTrue: openSidebar } = useBoolean(true)

  return <SidebarContext.Provider value={{ isSidebarOpen, closeSidebar, openSidebar }}>{children}</SidebarContext.Provider>
}
