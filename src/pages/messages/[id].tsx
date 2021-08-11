import { Box, Flex, Heading, Text, Button, useToast } from "@chakra-ui/react"
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'

import Head from 'next/head'

import { RiSendPlaneLine } from 'react-icons/ri'
import { useMutation } from "react-query"
import { setupApiClient } from "../../services/api"
import { queryClient } from "../../services/queryClient"
import { api } from "../../services/apiClient"
import { withSSRAuth } from "../../utils/withSSRAuth"
import { useRouter } from "next/router"

import { AxiosError } from "axios"

type MessageDetailsProps = {
  message: {
    id: string
    subject: string
    body: string
    sentAt: Date
    sender: {
      name: string
      email: string
    }
    tags: Array<{
      id: string
      title: string
    }>
  }
}

export default function MessageDetails({ message }: MessageDetailsProps) {
  const toast = useToast()
  const router = useRouter()

  const sendMessage = useMutation(
    async (messageId: string) => {
      const response = await api.post(`/messages/${messageId}/send`);

      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('messages');
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

  async function handleSendMessage(messageId) {
    try { 
      await sendMessage.mutateAsync(messageId);

      toast({
        description: 'Mensagem enviada com sucesso',
        status: 'success',
        position: 'top'
      })

      router.push('/messages')

    } catch {
      console.log('Error happened')
    }
  }

  return (
    <Box>
      <Head>
        <title>Detalhes da mensagem | Umbriel</title>
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
              <Heading size="lg" fontWeight="medium">Detalhes da mensagem</Heading>
            </Box>
            {!message?.sentAt && (
              <Button
                mt="4"
                type="submit"
                size="md"
                leftIcon={<RiSendPlaneLine size="24" />}
                onClick={() => handleSendMessage(message.id)}
                isLoading={sendMessage.isLoading}
                colorScheme="pink"
              >
                REALIZAR ENVIO
              </Button>
            )}
          </Flex>

          <Heading size="md" fontWeight="bold">Assunto do e-mail</Heading>
          <Text mt="2" fontWeight="medium">{message.subject}</Text>
          <Heading mt="4" size="md" fontWeight="bold">Remetente</Heading>
          <Text mt="2">{`${message.sender.name} | <${message.sender.email}>`}</Text>
          <Heading mt="4" size="md" fontWeight="bold">Conteúdo</Heading>
          <Box mt="4" bg="gray.100" p="4" borderRadius="md" dangerouslySetInnerHTML={{ __html: message.body }}/>
        </Box>
      </Flex>
    </Box>
  )
}

export const getServerSideProps = withSSRAuth(async ctx => {
  const { id } = ctx.params;

  const api = setupApiClient(ctx)

  const messageDataResponse = await api.get(`/messages/${id}`)

  if (!messageDataResponse.data) {
    return {
      redirect: {
        destination: '/messages',
        permanent: false
      }
    };
  }
  
  return {
    props: {
      message: messageDataResponse.data
    }
  };
});