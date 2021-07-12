import { Flex, Avatar, AvatarBadge, Box, Text, HStack } from "@chakra-ui/react";

export function Header() {
  return (
    <Flex 
      as="header" 
      h="20" 
      bgColor="white" 
      px="8"
      shadow="0 0 20px rgba(0, 0, 0, 0.05)"
    >
      <Flex
        width="100%"
        maxWidth={1480}
        marginX="auto"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontWeight="bold" fontSize="2xl">umbriel</Text>

        <HStack spacing="4" alignItems="center">
          <Box textAlign="right">
            <Text fontWeight="medium">Diego Fernandes</Text>
            <Text color="gray.500" fontSize="small">diego@rocketseat.team</Text>
          </Box>
          <Avatar size="md" name="Diego Fernandes" src="https://github.com/diego3g.png" />
        </HStack>
      </Flex>
    </Flex>
  );
}