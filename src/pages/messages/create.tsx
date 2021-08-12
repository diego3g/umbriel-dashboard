import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Box, Divider, Flex, FormControl, FormLabel, Heading, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useToast, VStack } from '@chakra-ui/react'
import { RiSaveLine } from 'react-icons/ri'

import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { Button } from '../../components/Button'
import { Input } from '../../components/Form/Input'
import { Select } from '../../components/Form/Select'
import { withSSRAuth } from '../../utils/withSSRAuth'
import { useEffect, useState } from 'react'
import { api } from '../../services/apiClient'
import { SubmitHandler, useForm } from 'react-hook-form'
import { EditorState } from 'draft-js'
import { useMutation } from 'react-query'
import { queryClient } from '../../services/queryClient'
import { convertToHTML } from 'draft-convert';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { AxiosError } from 'axios'
import Link from 'next/link'
import { setupApiClient } from '../../services/api'

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

type Template = {
  id: string;
  title: string;
  isDefault: boolean;
};

type SaveMessageFormData = {
  sender: string;
  template: string;
  tags: string[];
  subject: string;
  content: EditorState;
};

type CreateMessageFormData = {
  subject: string;
  body: string;
  templateId: string;
  senderId: string;
  tags: string[];
}

type yupTestObjectValue = Record<any, any> | EditorState;

const createMessageFormSchema = yup.object().shape({
  sender: yup.string().required('Remetente obrigatório'),
  tags: yup.array().of(yup.string()).nullable().required('Selecione pelo menos uma tag'),
  subject: yup.string().required('Remetente obrigatório'),
  template: yup.string().required('Template obrigatório'),
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
        return  <a href={block.text}>{block.text}</a>;
      }

      return <p />;
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
  const [templates, setTemplates] = useState<Template[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [numberOfRecipients, setNumberOfRecipients] = useState(0)

  const router = useRouter()
  const toast = useToast()

  const { register, handleSubmit, control, watch, formState } = useForm({
    defaultValues: {
      sender: '',
      tags: '',
      subject: '',
      template: '',
      content: EditorState.createEmpty(),
    },
    resolver: yupResolver(createMessageFormSchema)
  });

  const { tags: selectedTags } = watch()

  useEffect(() => {
    async function loadNumberOfRecipients() {
      const api = setupApiClient();

      const response = await api.get('/recipients/count', {
        params: {
          tagIds: selectedTags
        }
      })

      setNumberOfRecipients(response.data.data.count)
    }

    loadNumberOfRecipients()
  }, [selectedTags])

  const { errors } = formState;

  const createMessage = useMutation(
    async (message: CreateMessageFormData) => {
      const response = await api.post('/messages', message);

      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('messages');

        toast({
          title: 'Mensagem criada com sucesso.',
          status: 'success',
          position: 'top',
          duration: 3000
        })

        router.push('/messages');
      },
      onError: (error: AxiosError) => {
        toast({
          title: error?.response?.data?.error || 'Houve um erro ao cadastrar a mensagem',
          status: 'error',
          position: 'top',
          duration: 3000
        })
      }
    }
  );

  useEffect(() => {
    async function loadSenders() {
      const response = await api.get('/senders');

      const { data } = response.data;

      setSenders(data)
    }

    loadSenders()
  }, [])

  useEffect(() => {
    async function loadTags() {
      const response = await api.get('/tags');

      const { data } = response.data;

      setTags(data)
    }

    loadTags()
  }, [])

  useEffect(() => {
    async function loadTemplates() {
      const response = await api.get('/templates');

      const { data } = response.data;

      setTemplates(data)
    }

    loadTemplates()
  }, [])

  const handleSaveMessage: SubmitHandler<SaveMessageFormData> = async data => {
    try { 
      const currentContent = data.content.getCurrentContent();

      const htmlFormattedBody = convertToHTML(renderAsHTMLConfig)(currentContent as any)

      await createMessage.mutateAsync({
        senderId: data.sender,
        subject: data.subject,
        tags: data.tags,
        body: htmlFormattedBody,
        templateId: data.template
      });
    } catch {
      console.log('Error happened')
    }
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
              <Link href="/messages">
                <Button size="md" colorScheme="blackAlpha">
                  Cancelar
                </Button>
              </Link>

              <Button type="submit" size="md" leftIcon={<RiSaveLine size="24" />} colorScheme="pink">
                Salvar
              </Button>
            </HStack>
          </Flex>

          <Tabs variant="soft-rounded" colorScheme="purple">
            <TabList>
              <Tab>Entrega</Tab>
              <Tab>Conteúdo</Tab>
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

                  <Select
                    label="Selecione o template que vai ser utilizado"
                    error={errors.sender}
                    defaultValue=""
                    size="lg"
                    focusBorderColor="purple.500"
                    {...register('template')}
                  >
                    <option disabled value="">Selecione um template</option>
                    {templates.map((template) => (
                      <option key={template.id} value={template.id}>{template.title}</option>
                    ))}
                  </Select>

                  <FormControl id="recipients">
                    <FormLabel>Quem vai receber essa mensagem?</FormLabel>
                    <Flex mb="2" justifyContent="space-between" alignItems="center">
                      <Text fontSize="sm" color="gray.500">Selecione os recipientes</Text>
                      <Text fontSize="sm" color="gray.500">
                        <Text fontWeight="medium" color="pink.500" display="inline">{numberOfRecipients}</Text> recipientes
                      </Text>
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