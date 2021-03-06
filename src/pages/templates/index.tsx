import Head from 'next/head'
import { Box, Flex, Heading, HStack, Table, Tag, Tbody, Td, Text, Th, Thead, Tr, Link } from '@chakra-ui/react'

import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { withSSRAuth } from '../../utils/withSSRAuth'

export default function Templates() {
  return (
    <Box>
      <Head>
        <title>Templates</title>
      </Head>

      <Header />

      <Flex width="100%" my="6" maxWidth={1480} marginX="auto">
        <Sidebar />

        <Box 
          flex="1"
          ml="6"
          borderRadius={4}
          bgColor="white" 
          shadow="0 0 20px rgba(0, 0, 0, 0.05)"
          p="8"
        >
          <Flex mb="8" justifyContent="space-between" alignItems="center">
            <Box>
              <Heading size="lg" fontWeight="medium">Templates</Heading>
              <Text mt="1" color="gray.400">Listagem completa de templates</Text>
            </Box>
          </Flex>

          <Table>
            <Thead>
              <Tr>
                <Th>Template</Th>
                <Th w="16"></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Link color="blue.500" title="Ver detalhes">Default</Link>
                </Td>
                <Td textAlign="right">
                  <Button colorScheme="purple" disabled size="sm" fontSize="sm">Template padrão</Button>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Link color="blue.500" title="Ver detalhes">Template Ignite</Link>
                </Td>
                <Td textAlign="right">
                  <Button colorScheme="purple" size="sm" fontSize="sm">Definir como padrão</Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>

          <Flex mt="8" justifyContent="space-between" alignItems="center">
            <Box>
              <Text fontSize="md" color="gray.600">
                <strong>1</strong> - <strong>10</strong> de <strong>48</strong>
              </Text>
            </Box>

            <HStack spacing="2">
              <Button size="md" width="4">1</Button>
              <Button size="md" width="4" bgColor="gray.300">2</Button>
              <Button size="md" width="4" bgColor="gray.300">3</Button>
              <Button size="md" width="4" bgColor="gray.300">4</Button>
              <Text color="gray.500" px="2">...</Text>
              <Button size="md" width="4" bgColor="gray.300">67</Button>
              <Button size="md" width="4" bgColor="gray.300">68</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {}
  };
});