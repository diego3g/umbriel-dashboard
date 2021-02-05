import { useState } from "react";
import { Flex, Avatar, AvatarBadge, Box, Input, Text, SimpleGrid, Link } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

export function Header() {
  const [searchInput, setSearchInput] = useState('');

  return (
    <Flex 
      as="header" 
      h="20" 
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

      <Flex as="label" cursor="text" flex="1" ml="8" alignSelf="center" color="purple.500" position="relative">
        <RiSearchLine size="20" />
        <Input 
          variant="unstyled"
          color="gray.700"
          placeholder="Buscar por contato, tag, form, etc..." 
          paddingX="4"
          onChange={e => setSearchInput(e.target.value)}
          value={searchInput}
        />

        { !!searchInput && (
          <Box
            bgColor="white" 
            p="8"
            shadow="0 0 20px rgba(0, 0, 0, 0.1)"
            zIndex={10}
            position="absolute"
            left="0"
            top="100%"
            mt="4"
            borderRadius={4}
            w="2xl"
          >
            <Text fontWeight="bold" color="gray.700" fontSize="sm">Resultados para "die"</Text>

            <SimpleGrid mt="4" columns={3} spacing="4">
              <Link>
                <Text color="gray.500" fontWeight="bold" fontSize="xs">INSCRITO</Text>
                <Text fontWeight="medium" fontSize="sm" color="gray.800">
                  <Text as="mark" bgColor="purple.100">Die</Text>go Fernandes
                </Text>
              </Link>
              <Link>
                <Text color="gray.500" fontWeight="bold" fontSize="xs">INSCRITO</Text>
                <Text fontWeight="medium" fontSize="sm" color="gray.800">
                  <Text as="mark" bgColor="purple.100">Die</Text>go Fernandes
                </Text>
              </Link>
              <Link>
                <Text color="gray.500" fontWeight="bold" fontSize="xs">INSCRITO</Text>
                <Text fontWeight="medium" fontSize="sm" color="gray.800">
                  <Text as="mark" bgColor="purple.100">Die</Text>go Fernandes
                </Text>
              </Link>
              <Link>
                <Text color="gray.500" fontWeight="bold" fontSize="xs">INSCRITO</Text>
                <Text fontWeight="medium" fontSize="sm" color="gray.800">
                  <Text as="mark" bgColor="purple.100">Die</Text>go Fernandes
                </Text>
              </Link>
              <Link>
                <Text color="gray.500" fontWeight="bold" fontSize="xs">INSCRITO</Text>
                <Text fontWeight="medium" fontSize="sm" color="gray.800">
                  <Text as="mark" bgColor="purple.100">Die</Text>go Fernandes
                </Text>
              </Link>
              <Link>
                <Text color="gray.500" fontWeight="bold" fontSize="xs">INSCRITO</Text>
                <Text fontWeight="medium" fontSize="sm" color="gray.800">
                  <Text as="mark" bgColor="purple.100">Die</Text>go Fernandes
                </Text>
              </Link>
              <Link>
                <Text color="gray.500" fontWeight="bold" fontSize="xs">INSCRITO</Text>
                <Text fontWeight="medium" fontSize="sm" color="gray.800">
                  <Text as="mark" bgColor="purple.100">Die</Text>go Fernandes
                </Text>
              </Link>
              <Link>
                <Text color="gray.500" fontWeight="bold" fontSize="xs">INSCRITO</Text>
                <Text fontWeight="medium" fontSize="sm" color="gray.800">
                  <Text as="mark" bgColor="purple.100">Die</Text>go Fernandes
                </Text>
              </Link>
              <Link>
                <Text color="gray.500" fontWeight="bold" fontSize="xs">INSCRITO</Text>
                <Text fontWeight="medium" fontSize="sm" color="gray.800">
                  <Text as="mark" bgColor="purple.100">Die</Text>go Fernandes
                </Text>
              </Link>
            </SimpleGrid>
          </Box>
        ) }
      </Flex>
    
      
    </Flex>
  );
}