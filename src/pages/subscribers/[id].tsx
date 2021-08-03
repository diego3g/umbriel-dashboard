import { Box, Flex, Heading, Text, Table, Thead, Tbody, Tr, Th, Td, Button, useToast, Tag } from "@chakra-ui/react"
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'

import Head from 'next/head'

import { setupApiClient } from "../../services/api"
import { withSSRAuth } from "../../utils/withSSRAuth"
import { useContactDetails } from "../../services/hooks/useContactDetails"

import { RiDeleteBin4Line } from 'react-icons/ri'
import { useMutation } from "react-query"
import { api } from "../../services/apiClient"
import { queryClient } from "../../services/queryClient"
import { AxiosError } from "axios"
import { useRouter } from "next/router"

type ContactDetailsProps = {
  contact: {
    id: string
    name: string
    email: string
    is_unsubscribed: boolean
    is_blocked: boolean
    subscriptions: Array<{
      id: string
      tag: {
        id: string
        title: string
      }
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

type RemoveTagFormData = {
  contactId: string;
  tagId: string;
}

export default function ContactDetails({ contact }: ContactDetailsProps) {
  const router = useRouter();
  const toast = useToast();

  const { data } = useContactDetails(contact.id, {
    initialData: {
      contact
    }
  })

  const removeTag = useMutation(
    async (data: RemoveTagFormData) => {
      const response = await api.delete(`/tags/${data.tagId}/subscribers/${data.contactId}`);

      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('contact');
      },
      onError: (error: AxiosError) => {
        toast({
          title: error?.response?.data?.error || 'Houve um erro ao cadastrar a mensagem',
          status: 'error',
          position: 'top',
          duration: 3000
        })
      }
    },
  );

  async function handleRemoveTag(data: RemoveTagFormData) {
    try { 
      await removeTag.mutateAsync(data);

      toast({
        description: 'Tag removida com sucesso',
        status: 'success',
        position: 'top'
      })
    } catch {
      console.log('Error happened')
    }
  }

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
          <Text mt="2">{data?.contact?.name}</Text>
          <Heading mt="4" size="md" fontWeight="bold">Email do contato</Heading>
          <Text mt="2">{data?.contact?.email}</Text>
          <Heading mt="4" size="md" fontWeight="bold">Tags</Heading>
          <Table mt="4">
            <Thead>
              <Tr>
                <Th>Nome da tag</Th>
                <Th>Remover</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.contact?.subscriptions.map((subscription) => (
                <Tr key={subscription.id}>
                  <Td>
                    {subscription.tag.title}
                  </Td>
                  <Td color="gray.500">
                  <Button
                    mt="4"
                    type="submit"
                    size="sm"
                    leftIcon={<RiDeleteBin4Line size="16" />}
                    onClick={() => handleRemoveTag({ contactId: contact.id, tagId: subscription.tag.id})}
                    isLoading={removeTag.isLoading}
                    colorScheme="red"
                  >
                    Remover tag
                  </Button>
                  </Td>
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