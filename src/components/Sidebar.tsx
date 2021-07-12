import { VStack, Link, Text, Flex, Button } from "@chakra-ui/react";
import { RiMailOpenLine, RiContactsLine, RiPencilRulerLine, RiPriceTag3Line, RiSettings2Line, RiSendPlaneLine, RiLogoutBoxLine } from "react-icons/ri";
import { ActiveLink } from "./ActiveLink";

export function Sidebar() {
  function handleSignOut() {}

  return (
    <Flex
      as="aside" 
      w="72"
      minH="calc(100vh - 8rem)"
      bgColor="white" 
      py="8"
      shadow="0 0 20px rgba(0, 0, 0, 0.05)"
      borderRadius={4}
      direction="column"
    >
      <VStack spacing="4" pr="8" alignItems="stretch">
        <Text fontWeight="bold" color="gray.700" fontSize="small" px={8}>GERAL</Text>
        <ActiveLink href="/messages" passHref>
          <Link display="flex" alignItems="center" py="1" pl={8} borderLeft="3px solid">
            <RiMailOpenLine size="20" />
            <Text ml="4" fontSize="medium" fontWeight="medium">Mensagens</Text>
          </Link>
        </ActiveLink>
        <ActiveLink href="/subscribers" passHref>
          <Link display="flex" alignItems="center" py="1" pl={8} borderLeft="3px solid">
            <RiContactsLine size="20" />
            <Text ml="4" fontSize="medium" fontWeight="medium">Inscritos</Text>
          </Link>
        </ActiveLink>
        <ActiveLink href="/templates" passHref>
          <Link display="flex" alignItems="center" py="1" pl={8} borderLeft="3px solid">
            <RiPencilRulerLine size="20" />
            <Text ml="4" fontSize="medium" fontWeight="medium">Templates</Text>
          </Link>
        </ActiveLink>
        <ActiveLink href="/tags" passHref>
          <Link display="flex" alignItems="center" py="1" pl={8} borderLeft="3px solid">
            <RiPriceTag3Line size="20" />
            <Text ml="4" fontSize="medium" fontWeight="medium">Tags</Text>
          </Link>
        </ActiveLink>
      </VStack>
      <VStack spacing="4" pr="8" mt={8} alignItems="stretch">
        <Text fontWeight="bold" color="gray.700" fontSize="small" px={8}>SISTEMA</Text>
        <ActiveLink href="/settings" passHref>
          <Link display="flex" alignItems="center" py="1" pl={8} borderLeft="3px solid">
            <RiSettings2Line size="20" />
            <Text ml="4" fontSize="medium" fontWeight="medium">Configuração</Text>
          </Link>
        </ActiveLink>
        <ActiveLink href="/senders" passHref>
          <Link display="flex" alignItems="center" py="1" pl={8} borderLeft="3px solid">
            <RiSendPlaneLine size="20" />
            <Text ml="4" fontSize="medium" fontWeight="medium">Remetentes</Text>
          </Link>
        </ActiveLink>
      </VStack>

      <Button
        onClick={handleSignOut}
        variant="link"
        alignSelf="flex-start"
        display="flex"
        alignItems="center"
        py="1"
        ml={8}
        mt="auto"
      >
        <RiLogoutBoxLine size="20" />
        <Text ml="4" fontSize="medium" fontWeight="medium">Logout</Text>
      </Button>
    </Flex>
  );
}