import { useState } from "react";
import { Flex, Avatar, Box, Input, Text, SimpleGrid, Link, useColorModeValue, HStack, useBreakpointValue, IconButton, Icon } from "@chakra-ui/react";
import { RiLogoutCircleRLine, RiMenuLine, RiNotificationLine, RiSearchLine, RiUserAddLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { useSidebarMobileDrawer } from "../contexts/SidebarMobileDrawerContext";

export function Header() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');

  const { onOpen } = useSidebarMobileDrawer()
  
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })
  
  function handleSignOut() {
    router.push('/')
  }
  
  const textColor = useColorModeValue("gray.700", "gray.50")
  const inputBg = useColorModeValue("white", "gray.800")
  const inputText = useColorModeValue("gray.700", "gray.200")
  
  return (
    <Flex 
      as="header" 
      h="20" 
      mt="4"
      width="100%"
      maxWidth={1480}
      marginX="auto"
      alignItems="center"
    >

      {!isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          variant="unstyled"
          fontSize="24"
          pb={["1", 0]}
          mr="2"
          onClick={onOpen}
        />
      )}

      <Text
        color={textColor}
        fontSize="3xl"
        fontWeight="bold"
        letterSpacing="tight"
        w="64"
      >
        umbriel
        <Text display="inline" color="pink.500" ml="1">.</Text>
      </Text>
      {isWideVersion && (
        <Flex 
          width="100%"
          marginX="auto"
          alignItems="center"
        >
          <Flex 
            as="label" 
            cursor="text" 
            flex="1"
            alignSelf="center"
            position="relative"
            py="4"
            px="8"
            ml="6"
            mr="6"
            maxWidth={400}
            color={inputText}
            backgroundColor={inputBg}
            borderRadius={100}
          >
            <RiSearchLine size="20" />
            <Input 
              variant="unstyled"
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
              px={["6", "8"]}
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
      )}
      
      <Flex alignItems="center" ml="auto">
        <HStack
          spacing={["6", "8"]}
          mx={["6", "8"]}
          pr={["6", "8"]}
          py="1"
          color="gray.300"
          borderRightWidth={1}
          borderColor="gray.700"
        >
          <RiNotificationLine size="20" />
          <RiUserAddLine size="20" />
        </HStack>

        <Flex alignItems="center">
          {isWideVersion && (
            <Box mr="4" textAlign="right">
              <Text color={textColor}>Diego Fernandes</Text>
              <Text color="gray.300" fontSize="small">diego@rocketseat.team</Text>
            </Box>
          )}
          <Avatar size="md" name="Diego Fernandes" src="https://github.com/diego3g.png" />
        </Flex>

        { isWideVersion && (
          <Link as="button" color="gray.300" ml="4" onClick={handleSignOut}>
            <RiLogoutCircleRLine size="20" />
          </Link>
        )}
      </Flex>
    </Flex>
  );
}