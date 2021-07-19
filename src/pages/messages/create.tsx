import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Box, Divider, Flex, FormControl, FormLabel, Heading, HStack, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react'
import { RiSaveLine } from 'react-icons/ri'

import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { Button } from '../../components/Button'
import { Input } from '../../components/Form/Input'
import { withSSRAuth } from '../../utils/withSSRAuth'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { SubmitHandler, useForm } from 'react-hook-form'
import { EditorState, convertToRaw } from 'draft-js'

const TextEditor = dynamic(() => import("../../components/Editor"), {
  ssr: false,
})

type Sender = {
  id: string;
  name: string;
  email: string;
  isValidated: boolean;
  isDefault: boolean;
}

type Tag = {
  id: string;
  title: string;
  subscribersCount: number;
};

type SaveMessageFormData = {
  sender: string;
  tags: string;
  subject: string;
  content: EditorState;
};


export default function CreateMessage() {
  const [senders, setSenders] = useState<Sender[]>([])
  const [tags, setTags] = useState<Tag[]>([])

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      sender: '',
      tags: '',
      subject: '',
      content: EditorState.createEmpty(),
    }
  });

  useEffect(() => {
    async function loadSenders() {
      const response = await api.get('/senders/search');

      const { data } = response.data;

      setSenders(data)
    }

    loadSenders()
  }, [])

  useEffect(() => {
    async function loadTags() {
      const response = await api.get('/tags/search');

      const { data } = response.data;

      setTags(data)
    }

    loadTags()
  }, [])

  const handleSaveMessage: SubmitHandler<SaveMessageFormData> = async data => {
    const blocks = convertToRaw(data.content.getCurrentContent()).blocks;

    const formattedBlocks = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
    
    //WIP
    
  };

  return (
    <Box>
      <Head>
        <title>Criar mensagem | Umbriel</title>
      </Head>

      <Header />

      <Flex width="100%" my="6" maxWidth={1480} marginX="auto">
        <Sidebar />

        <Box 
          as="form"
          flex="1"
          ml="6"
          borderRadius={4}
          bgColor="white" 
          shadow="0 0 20px rgba(0, 0, 0, 0.05)"
          p="8"
          onSubmit={handleSubmit(handleSaveMessage)}
        >
          <Flex mb="8" justifyContent="space-between" alignItems="center">
            <Box>
              <Heading size="lg" fontWeight="medium">Criar mensagem</Heading>
            </Box>

            <HStack>
              <Button size="md" colorScheme="blackAlpha">
                Cancelar
              </Button>

              <Button type="submit" size="md" leftIcon={<RiSaveLine size="24" />} colorScheme="pink">
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
                    <Select size="lg" focusBorderColor="purple.500" {...register('sender')}>
                      {senders.map(sender => (
                        <option>{`${sender.name} | <${sender.email}>`}</option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl id="recipients">
                    <FormLabel>Quem vai receber essa mensagem?</FormLabel>
                    <Flex mb="2" justifyContent="space-between" alignItems="center">
                      <Text fontSize="sm" color="gray.500">Selecione os recipientes</Text>
                      {/* <Text fontSize="sm" color="gray.500">
                        <Text fontWeight="medium" color="pink.500" display="inline">400.019</Text> recipientes
                      </Text> */}
                    </Flex>
                    <Select h="40" icon={<span />} multiple size="lg" focusBorderColor="purple.500" {...register('tags')}>
                      <optgroup label="Tags">
                        {tags?.map(tag => (
                          <option>{tag.title}</option>
                        ))}
                      </optgroup>
                    </Select>
                  </FormControl>
                </VStack>
              </TabPanel>
              <TabPanel p="0">
                <VStack spacing="6" maxWidth="4xl">
                  <FormControl id="sender">
                    <FormLabel>Assunto do e-mail</FormLabel>
                    <Input name="subject" {...register('subject')}/>
                  </FormControl>

                  <FormControl id="body">
                    <FormLabel>Corpo do e-mail</FormLabel>
                    <Box borderWidth={1} borderRadius={4} p="4">
                      <TextEditor name="content" control={control}/>
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