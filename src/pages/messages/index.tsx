import Head from 'next/head'
import { Box, Flex, Heading, HStack, Table, Tag, Tbody, Td, Text, Th, Thead, Tr, Link, StackDivider } from '@chakra-ui/react'

import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'

export default function Messages() {
  return (
    <Box>
      <Head>
        <title>Mensagens</title>
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
              <Heading size="lg" fontWeight="medium">Mensagens</Heading>
              <Text mt="1" color="gray.400">Listagem completa de mensagens</Text>
            </Box>
          </Flex>

          <Table>
            <Thead>
              <Tr>
                <Th>Mensagem</Th>
                <Th>Enviada em</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Box>
                    <Link
                      title="Ver detalhes"
                      fontSize="lg"
                      color="blue.500"
                    >
                      Nova parceria na Rocketseat
                    </Link>
                    <HStack mt="3" spacing="3" divider={<StackDivider borderColor="gray.200" />}>
                      <Text color="gray.500">214K Recipients</Text>
                      <Text color="gray.500">19.2% Open Rate</Text>
                      <Text color="gray.500">3.8% Click Rate</Text>
                      <Text color="gray.500">9,273 Clicks</Text>
                      <Text color="gray.500">469 Unsubscribers</Text>
                    </HStack>
                  </Box>
                </Td>
                <Td color="gray.500">04 de Abril, 2021</Td>
              </Tr>
              <Tr>
                <Td>
                  <Box>
                    <Link
                      title="Ver detalhes"
                      fontSize="lg"
                      color="blue.500"
                    >
                      [Ignite] Aqui está sua primeira conquista
                    </Link>
                    <HStack mt="3" spacing="3" divider={<StackDivider borderColor="gray.200" />}>
                      <Text color="gray.500">214K Recipients</Text>
                      <Text color="gray.500">19.2% Open Rate</Text>
                      <Text color="gray.500">3.8% Click Rate</Text>
                      <Text color="gray.500">9,273 Clicks</Text>
                      <Text color="gray.500">469 Unsubscribers</Text>
                    </HStack>
                  </Box>
                </Td>
                <Td color="gray.500">04 de Abril, 2021</Td>
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
