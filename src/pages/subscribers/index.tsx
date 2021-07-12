import Head from 'next/head'
import { Box, Flex, Heading, HStack, Table, Tag, Tbody, Td, Text, Th, Thead, Tr, Link } from '@chakra-ui/react'

import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { withSSRAuth } from '../../utils/withSSRAuth'

export default function Subscribers() {
  return (
    <Box>
      <Head>
        <title>Inscritos</title>
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
              <Heading size="lg" fontWeight="medium">Inscritos</Heading>
              <Text mt="1" color="gray.400">Listagem completa de inscritos</Text>
            </Box>
          </Flex>

          <Table>
            <Thead>
              <Tr>
                <Th>Contato</Th>
                <Th>Data de inscrição</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Link color="blue.500" title="Ver detalhes">diego@rocketseat.team</Link>
                </Td>
                <Td color="gray.500">04 de Abril, 2021</Td>
                <Td>
                  <Tag colorScheme="purple">Inscrito</Tag>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Link color="blue.500" title="Ver detalhes">diego.schell.f@gmail.com</Link>
                </Td>
                <Td color="gray.500">04 de Abril, 2021</Td>
                <Td>
                  <Tag colorScheme="red">Cancelado</Tag>
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