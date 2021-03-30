import React from "react";
import { Box, Link, Text, VStack } from "@chakra-ui/layout";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";

import { Button } from '../Button'

import { 
  RiDashboardLine, 
  RiMailOpenLine, 
  RiContactsLine, 
  RiPencilRulerLine, 
  RiPriceTag3Line, 
  RiInputMethodLine, 
  RiGitMergeLine, 
  RiSettings2Line, 
  RiSendPlaneLine, 
  RiAppsLine,
} from "react-icons/ri";

import { ActiveLink } from "../ActiveLink";

export function SidebarNav() {
  const textColor = useColorModeValue("gray.700", "gray.50")
  const { colorMode,toggleColorMode } = useColorMode()

  return (
    <Box>
      <VStack spacing="4" pr="8" alignItems="stretch">
        <Text fontWeight="bold" color="gray.400" fontSize="small">GERAL</Text>
        <ActiveLink href="/dashboard" passHref>
          <Link display="flex" alignItems="center" color="pink.400" py="1">
            <RiDashboardLine size="20" color={colorMode === 'dark' ? 'white' : 'black' }/>
            <Text ml="4" fontWeight="medium" color={textColor}>Painel</Text>
          </Link>
        </ActiveLink>
        <ActiveLink href="/users" passHref>
          <Link display="flex" alignItems="center" py="1">
            <RiContactsLine size="20" color={colorMode === 'dark' ? 'white' : 'black' }/>
            <Text ml="4" fontWeight="medium" color={textColor}>Mensagens</Text>
          </Link>
        </ActiveLink>
        <ActiveLink href="/subscribers" passHref>
          <Link display="flex" alignItems="center" py="1">
            <RiMailOpenLine size="20" color={colorMode === 'dark' ? 'white' : 'black' }/>
            <Text ml="4" fontWeight="medium" color={textColor}>Inscritos</Text>
          </Link>
        </ActiveLink>
        <Link display="flex" alignItems="center" py="1">
          <RiPencilRulerLine size="20" color={colorMode === 'dark' ? 'white' : 'black' }/>
          <Text ml="4" fontWeight="medium" color={textColor}>Templates</Text>
        </Link>
        <Link display="flex" alignItems="center" py="1">
          <RiPriceTag3Line size="20" color={colorMode === 'dark' ? 'white' : 'black' }/>
          <Text ml="4" fontWeight="medium" color={textColor}>Tags e segmentos</Text>
        </Link>
      </VStack>
      <VStack spacing="4" pr="8" mt="12" alignItems="stretch">
        <Text fontWeight="bold" color="gray.400" fontSize="small">AUTOMAÇÃO</Text>
        <Link display="flex" alignItems="center" py="1">
          <RiInputMethodLine size="20" color={colorMode === 'dark' ? 'white' : 'black' }/>
          <Text ml="4" fontWeight="medium" color={textColor}>Formulários</Text>
        </Link>
        <Link display="flex" alignItems="center" py="1">
          <RiGitMergeLine size="20" color={colorMode === 'dark' ? 'white' : 'black' }/>
          <Text ml="4" fontWeight="medium" color={textColor}>Automação</Text>
        </Link>
      </VStack>
      <VStack spacing="4" pr="8" mt="12" alignItems="stretch">
        <Text fontWeight="bold" color="gray.400" fontSize="small">SISTEMA</Text>
        <Link display="flex" alignItems="center" py="1">
          <RiSettings2Line size="20" color={colorMode === 'dark' ? 'white' : 'black' }/>
          <Text ml="4" fontWeight="medium" color={textColor}>Configuração</Text>
        </Link>
        <Link display="flex" alignItems="center" py="1">
          <RiSendPlaneLine size="20" color={colorMode === 'dark' ? 'white' : 'black' }/>
          <Text ml="4" fontWeight="medium" color={textColor}>Remetentes</Text>
        </Link>
        <Link display="flex" alignItems="center" py="1">
          <RiAppsLine size="20" color={colorMode === 'dark' ? 'white' : 'black' }/>
          <Text ml="4" fontWeight="medium" color={textColor}>API e webhooks</Text>
        </Link>
      </VStack>

      <Button onClick={toggleColorMode} mr={6}>
        Theme
      </Button>
    </Box>
  )
}
