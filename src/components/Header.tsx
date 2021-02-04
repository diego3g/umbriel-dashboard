import { Flex, Avatar, AvatarBadge, Box, Input, Text } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

export function Header() {
  return (
    <Flex 
      as="header" 
      h="20" 
      w="100vw" 
      bgColor="white" 
      px="8"
      shadow="0 0 20px rgba(0, 0, 0, 0.05)"
      alignItems="center"
    >
      <Flex alignItems="center" w="60" mr="8">
        <Avatar size="md" name="Diego Fernandes" src="https://github.com/diego3g.png">
          <AvatarBadge borderColor="papayawhip" bg="purple.500" boxSize="1.25rem" />
        </Avatar>
        <Box ml="4">
          <Text fontWeight="medium">Diego Fernandes</Text>
          <Text color="gray.500" fontSize="small">diego@rocketseat.team</Text>
        </Box>
      </Flex>

      <Flex as="label" cursor="text" flex="1" ml="8" alignSelf="center" color="purple.500">
        <RiSearchLine size="20" />
        <Input 
          variant="unstyled"
          color="gray.700"
          placeholder="Buscar por contato, tag, form, etc..." 
          paddingX="4"
        />
      </Flex>
    </Flex>
  );
}