import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react"
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'

import Head from 'next/head'

import { RiSendPlaneLine } from 'react-icons/ri'

export default function MessageDetails() {
  return (
    <Box>
      <Head>
        <title>Criar mensagem | Umbriel</title>
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
            <Button mt="4" type="submit" size="md" leftIcon={<RiSendPlaneLine size="24" />} colorScheme="pink">
              REALIZAR ENVIO
            </Button>
          </Flex>

          <Heading size="md" fontWeight="bold">Assunto do e-mail</Heading>
          <Text mt="2" fontWeight="medium">Assunto do e-mail</Text>
          <Heading mt="4" size="md" fontWeight="bold">Remetente</Heading>
          <Text mt="2">{`Joseph Oliveira | <oi@rocketseat.team>`}</Text>
          <Heading mt="4" size="md" fontWeight="bold">Conteúdo</Heading>
          <Box mt="4" bg="gray.100" p="4" borderRadius="md" dangerouslySetInnerHTML={{ __html: '<p>Hello</p>'}}/>
        </Box>
      </Flex>
    </Box>
  )
}