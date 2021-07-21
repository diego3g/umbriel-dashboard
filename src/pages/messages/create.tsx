import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Box, Divider, Flex, FormControl, FormLabel, Heading, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react'
import { RiSaveLine } from 'react-icons/ri'

import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { Button } from '../../components/Button'
import { Input } from '../../components/Form/Input'
import { Select } from '../../components/Form/Select'
import { withSSRAuth } from '../../utils/withSSRAuth'
import { useEffect, useMemo, useState } from 'react'
import { api } from '../../services/api'
import { SubmitHandler, useForm } from 'react-hook-form'
import { EditorState } from 'draft-js'
import { useMutation } from 'react-query'
import { queryClient } from '../../services/queryClient'
import { convertToHTML } from 'draft-convert';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { TypeOfShape } from 'yup/lib/object'

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
  tags: string[];
  subject: string;
  content: EditorState;
};

type CreateMessageFormData = {
  subject: string;
  body: string;
  templateId?: string;
  senderId: string;
  tags: string[];
}

type yupTestObjectValue = Record<any, any> | EditorState;

const createMessageFormSchema = yup.object().shape({
  sender: yup.string().required('Remetente obrigatório'),
  tags: yup.array().of(yup.string()).nullable().required('Selecione pelo menos uma tag'),
  subject: yup.string().required('Remetente obrigatório'),
  content: yup.object().test("hasText", "Corpo do e-mail é obrigatório", (value: yupTestObjectValue) => {
    return value?.getCurrentContent()?.hasText();
  })
});

const renderAsHTMLConfig = {
  blockToHTML: (block) => {
    if (block.type === 'unstyled') {
      if (block.text === ' ' || block.text === '') return <br />;

      const isUrlExpression = /^(?:http(s)?:\/\/)([\w.-])+(?:[\w\.-]+)+([\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.])+$/;

      if (isUrlExpression.test(block.text)) {
        return <a href={block.text}>{block.text}</a>;
      }

      return <div />;
    }
    if (block.type === 'PARAGRAPH') {
      return <p />;
    }
  },
  entityToHTML: (entity, originalText) => {
    if (entity.type === 'LINK') {
      return <a href={entity.data.url}>{originalText}</a>;
    }
    return originalText;
  }
}

export default function CreateMessage() {
  const [senders, setSenders] = useState<Sender[]>([])
  const [tags, setTags] = useState<Tag[]>([])

  const { register, handleSubmit, control, watch, formState } = useForm({
    defaultValues: {
      sender: '',
      tags: '',
      subject: '',
      content: EditorState.createEmpty(),
    },
    resolver: yupResolver(createMessageFormSchema)
  });

  const { errors } = formState;

  const { sender, subject, content } = watch();

  const previewFormattedBodyContent = useMemo(() => {
    if (content && content.constructor.name === "EditorState") {
      const currentContent = content.getCurrentContent();
      
      if (currentContent.hasText()) {
        const convertedToHtml = convertToHTML(renderAsHTMLConfig)(currentContent as any)
        
        return convertedToHtml;
      }
    }      

    return '';
  }, [content])

  const createOrbit = useMutation(
    async (message: CreateMessageFormData) => {
      const response = await api.post('/messages', message);

      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('messages');
      }
    }
  );

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
    const currentContent = data.content.getCurrentContent();

    const htmlFormattedBody = convertToHTML(renderAsHTMLConfig)(currentContent as any)

    await createOrbit.mutateAsync({
      senderId: data.sender,
      subject: data.subject,
      tags: data.tags,
      body: htmlFormattedBody
    });
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
                  <Select
                    label="Quem vai enviar essa mensagem?"
                    error={errors.sender}
                    defaultValue=""
                    size="lg"
                    focusBorderColor="purple.500"
                    {...register('sender')}
                  >
                    <option disabled value="">Selecione um remetente</option>
                    {senders.map((sender) => (
                      <option key={sender.id} value={sender.id}>{`${sender.name} | <${sender.email}>`}</option>
                    ))}
                  </Select>

                  <FormControl id="recipients">
                    <FormLabel>Quem vai receber essa mensagem?</FormLabel>
                    <Flex mb="2" justifyContent="space-between" alignItems="center">
                      <Text fontSize="sm" color="gray.500">Selecione os recipientes</Text>
                      {/* <Text fontSize="sm" color="gray.500">
                        <Text fontWeight="medium" color="pink.500" display="inline">400.019</Text> recipientes
                      </Text> */}
                    </Flex>
                    <Select
                      h="40"
                      multiple
                      icon={<span />}
                      size="lg"
                      focusBorderColor="purple.500"
                      error={errors.tags}
                      {...register('tags')}
                    >
                      <optgroup label="Tags">
                        {tags?.map(tag => (
                          <option key={tag.id} value={tag.id}>{tag.title}</option>
                        ))}
                      </optgroup>
                    </Select>
                  </FormControl>
                </VStack>
              </TabPanel>
              <TabPanel p="0">
                <VStack spacing="6" maxWidth="4xl">
                  <Input
                    label="Assunto do e-mail"
                    error={errors.subject}
                    name="subject"
                    {...register('subject')}
                  />

                  <TextEditor
                    error={errors.content}
                    label="Corpo do e-mail"
                    name="content"
                    control={control}
                  />
                </VStack>
              </TabPanel>
              <TabPanel p="0">
                <Heading size="md" fontWeight="bold">Assunto do e-mail</Heading>
                <Text mt="2" fontWeight="medium">{subject}</Text>
                <Heading mt="4" size="md" fontWeight="bold">Remetente</Heading>
                {senders.map(s => s.id === sender && (
                  <Text key={s.id} mt="2">{`${s.name} | <${s.email}>`}</Text>
                ))}
                <Heading mt="4" size="md" fontWeight="bold">Conteúdo</Heading>
                <Box mt="4" bg="gray.100" p="4" borderRadius="md" dangerouslySetInnerHTML={{ __html: previewFormattedBodyContent}}/>
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