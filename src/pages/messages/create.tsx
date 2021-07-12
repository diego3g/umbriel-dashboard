import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Box, Divider, Flex, FormControl, FormLabel, Heading, HStack, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react'
import { RiSaveLine } from 'react-icons/ri'

import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { Button } from '../../components/Button'
import { Input } from '../../components/Form/Input'
import { withSSRAuth } from '../../utils/withSSRAuth'

const TextEditor = dynamic(() => import("../../components/Editor"), {
  ssr: false,
})

export default function CreateMessage() {
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
              <Heading size="lg" fontWeight="medium">Criar mensagem</Heading>
              {/* <Text mt="1" color="gray.400"></Text> */}
            </Box>

            <HStack>
              <Button size="md" colorScheme="blackAlpha">
                Cancelar
              </Button>

              <Button size="md" leftIcon={<RiSaveLine size="24" />} colorScheme="pink">
                Salvar
              </Button>
            </HStack>
          </Flex>

          <Tabs variant="soft-rounded" colorScheme="purple">
            <TabList>
              <Tab>Entrega</Tab>
              <Tab>Conteúdo</Tab>
              <Tab>Preview</Tab>
            </TabList>
            <Divider my="6" />
            <TabPanels>
              <TabPanel p="0">
                <VStack spacing="6" maxWidth="4xl">
                  <FormControl id="sender">
                    <FormLabel>Quem vai enviar essa mensagem?</FormLabel>
                    <Select size="lg" focusBorderColor="purple.500">
                      <option selected>Diego | Rocketseat &lt;diego@rocketseat.team&gt;</option>
                      <option>Robson | Rocketseat &lt;robson@rocketseat.team&gt;</option>
                      <option>Cleiton | Rocketseat &lt;ciego@rocketseat.team&gt;</option>
                      <option>Rodrigo | Rocketseat &lt;terron@rocketseat.team&gt;</option>
                      <option>Abraão | Rocketseat &lt;abraao@rocketseat.team&gt;</option>
                    </Select>
                  </FormControl>

                  <FormControl id="recipients">
                    <FormLabel>Quem vai receber essa mensagem?</FormLabel>
                    <Flex mb="2" justifyContent="space-between" alignItems="center">
                      <Text fontSize="sm" color="gray.500">Selecione os recipientes</Text>
                      <Text fontSize="sm" color="gray.500">
                        <Text fontWeight="medium" color="pink.500" display="inline">400.019</Text> recipientes
                      </Text>
                    </Flex>
                    <Select h="40" icon={<span />} multiple size="lg" focusBorderColor="purple.500">
                      <optgroup label="Segmentos">
                        <option>[Ignite] Turma 14</option>
                        <option>[Ignite] Turma 13</option>
                        <option>[Ignite] Turma 12</option>
                        <option>[Ignite] Turma 11</option>
                      </optgroup>
                      <optgroup label="Tags">
                        <option>Alumni</option>
                        <option>NLW</option>
                        <option>Time</option>
                      </optgroup>
                    </Select>
                  </FormControl>
                </VStack>
              </TabPanel>
              <TabPanel p="0">
                <VStack spacing="6" maxWidth="4xl">
                  <FormControl id="sender">
                    <FormLabel>Assunto do e-mail</FormLabel>
                    <Input name="subject" />
                  </FormControl>

                  <FormControl id="body">
                    <FormLabel>Corpo do e-mail</FormLabel>
                    <Box borderWidth={1} borderRadius={4} p="4">
                      <TextEditor />
                    </Box>
                  </FormControl>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
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