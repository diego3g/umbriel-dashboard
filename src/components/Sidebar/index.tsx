import { Flex, useBreakpointValue, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, useColorModeValue } from "@chakra-ui/react";
import { useSidebarMobileDrawer } from "../../contexts/SidebarMobileDrawerContext";

import { SidebarNav } from "./SidebarNav";

export function Sidebar() {
  const textColor = useColorModeValue("gray.700", "gray.50")
  const shapeBg = useColorModeValue("white", "gray.800")

  const { isOpen, onClose } = useSidebarMobileDrawer()

  const isSidebarDrawer = useBreakpointValue({
    base: true,
    lg: false,
  }) 

  if (isSidebarDrawer) {
    return (
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
      >
        <DrawerOverlay>
          <DrawerContent bg={shapeBg} p="4">
            <DrawerCloseButton m="6" />
            <DrawerHeader color={textColor}>
              Navegação
            </DrawerHeader>

            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
  } else {
    return (
      <Flex
        as="aside" 
        w="64"
        borderRadius={4}
        direction="column"
        mr="8"
      >
        <SidebarNav />
      </Flex>
    );
  }
}