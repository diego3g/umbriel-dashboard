import { Box, Flex, Heading, Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react"
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'

import Head from 'next/head'

import { setupApiClient } from "../../services/api"
import { withSSRAuth } from "../../utils/withSSRAuth"

type ContactDetailsProps = {
  contact: {
    id: string
    name: string
    email: string
    is_unsubscribed: boolean
    is_blocked: boolean
    subscriptions: Array<{
      id: string
      tag: string
    }>
    messages: Array<{
      id: string
      subject: string
      sentAt: Date
      events: Array<{
        id: string
        type: string
        createdAt: Date
      }>
    }>
  }
  
}

export default function ContactDetails({ contact }: ContactDetailsProps) {
  return (
    <Box>
      <Head>
        <title>Detalhes do contato | Umbriel</title>
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
              <Heading size="lg" fontWeight="medium">Detalhes do contato</Heading>
            </Box>
          </Flex>

          <Heading size="md" fontWeight="bold">Nome do contato</Heading>
          <Text mt="2">{contact.name}</Text>
          <Heading mt="4" size="md" fontWeight="bold">Email do contato</Heading>
          <Text mt="2">{contact.email}</Text>
          <Heading mt="4" size="md" fontWeight="bold">Tags</Heading>
          <Table mt="4">
            <Thead>
              <Tr>
                <Th>Nome da tag</Th>
                {/* <Th>Remover</Th> */}
              </Tr>
            </Thead>
            <Tbody>
              {contact.subscriptions.map((subscription) => (
                <Tr key={subscription.id}>
                  <Td>
                    {subscription.tag}
                  </Td>
                  {/* <Td color="gray.500">apagar</Td> */}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Box>
  )
}

export const getServerSideProps = withSSRAuth(async ctx => {
  const { id } = ctx.params;

  const api = setupApiClient(ctx)

  const messageDataResponse = await api.get(`/contacts/${id}`)

  if (!messageDataResponse.data) {
    return {
      redirect: {
        destination: '/subscribers',
        permanent: false
      }
    };
  }
  
  return {
    props: {
      contact: messageDataResponse.data
    }
  };
});