import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

type SidebarMobileDrawerContextData = {} & UseDisclosureReturn

const SidebarMobileDrawerContext = createContext({} as SidebarMobileDrawerContextData)

interface SidebarMobileDrawerProviderProps {
  children: ReactNode
}

export function SidebarMobileDrawerProvider({ children }: SidebarMobileDrawerProviderProps) {
  const disclosure = useDisclosure()
  const { asPath } = useRouter()

  useEffect(() => {
    disclosure.onClose()
  }, [asPath])

  return (
    <SidebarMobileDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarMobileDrawerContext.Provider>
  )
}

export const useSidebarMobileDrawer = () => useContext(SidebarMobileDrawerContext)