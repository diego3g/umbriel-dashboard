import { VStack, Link, Text, Flex, useColorModeValue } from "@chakra-ui/react";
import { RiDashboardLine, RiMailOpenLine, RiContactsLine, RiPencilRulerLine, RiPriceTag3Line, RiInputMethodLine, RiGitMergeLine, RiSettings2Line, RiSendPlaneLine, RiAppsLine, RiLogoutBoxLine } from "react-icons/ri";

export function Sidebar() {
  const shapeBg = useColorModeValue("white", "gray.800")
  const textColor = useColorModeValue("gray.700", "gray.50")

  return (
    <Flex
      as="aside" 
      w="72"
      bgColor={shapeBg}
      py="8"
      mx="6"
      shadow="0 0 20px rgba(0, 0, 0, 0.05)"
      borderRadius={4}
      direction="column"
    >
      <VStack spacing="4" pr="8" alignItems="stretch">
        <Text fontWeight="bold" color={textColor} fontSize="small" px={8}>GERAL</Text>
        <Link display="flex" alignItems="center" color="purple.500" py="1" pl={8} borderLeft="3px solid">
          <RiDashboardLine size="20" />
          <Text ml="4" fontSize="medium" fontWeight="medium">Painel</Text>
        </Link>
        <Link display="flex" alignItems="center" py="1" pl={8} color="gray.500" borderLeft="3px solid transparent">
          <RiMailOpenLine size="20" />
          <Text ml="4" fontSize="medium" fontWeight="medium">Mensagens</Text>
        </Link>
        <Link display="flex" alignItems="center" py="1" pl={8} color="gray.500" borderLeft="3px solid transparent">
          <RiContactsLine size="20" />
          <Text ml="4" fontSize="medium" fontWeight="medium">Inscritos</Text>
        </Link>
        <Link display="flex" alignItems="center" py="1" pl={8} color="gray.500" borderLeft="3px solid transparent">
          <RiPencilRulerLine size="20" />
          <Text ml="4" fontSize="medium" fontWeight="medium">Templates</Text>
        </Link>
        <Link display="flex" alignItems="center" py="1" pl={8} color="gray.500" borderLeft="3px solid transparent">
          <RiPriceTag3Line size="20" />
          <Text ml="4" fontSize="medium" fontWeight="medium">Tags e segmentos</Text>
        </Link>
      </VStack>
      <VStack spacing="4" pr="8" mt={8} alignItems="stretch">
        <Text fontWeight="bold" color={textColor} fontSize="small" px={8}>AUTOMAÇÃO</Text>
        <Link display="flex" alignItems="center" py="1" pl={8} color="gray.500" borderLeft="3px solid transparent">
          <RiInputMethodLine size="20" />
          <Text ml="4" fontSize="medium" fontWeight="medium">Formulários</Text>
        </Link>
        <Link display="flex" alignItems="center" py="1" pl={8} color="gray.500" borderLeft="3px solid transparent">
          <RiGitMergeLine size="20" />
          <Text ml="4" fontSize="medium" fontWeight="medium">Automação</Text>
        </Link>
      </VStack>
      <VStack spacing="4" pr="8" mt={8} alignItems="stretch">
        <Text fontWeight="bold" color={textColor} fontSize="small" px={8}>SISTEMA</Text>
        <Link display="flex" alignItems="center" py="1" pl={8} color="gray.500" borderLeft="3px solid transparent">
          <RiSettings2Line size="20" />
          <Text ml="4" fontSize="medium" fontWeight="medium">Configuração</Text>
        </Link>
        <Link display="flex" alignItems="center" py="1" pl={8} color="gray.500" borderLeft="3px solid transparent">
          <RiSendPlaneLine size="20" />
          <Text ml="4" fontSize="medium" fontWeight="medium">Remetentes</Text>
        </Link>
        <Link display="flex" alignItems="center" py="1" pl={8} color="gray.500" borderLeft="3px solid transparent">
          <RiAppsLine size="20" />
          <Text ml="4" fontSize="medium" fontWeight="medium">API e webhooks</Text>
        </Link>
      </VStack>

      <Link display="flex" alignItems="center" py="1" pl={8} color="gray.500" borderLeft="3px solid transparent" mt="auto">
        <RiLogoutBoxLine size="20" />
        <Text ml="4" fontSize="medium" fontWeight="medium">Logout</Text>
      </Link>
    </Flex>
  );
}