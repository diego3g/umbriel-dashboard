import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Box, Flex, Heading, HStack, useToast, VStack } from '@chakra-ui/react'
import { RiSaveLine } from 'react-icons/ri'

import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { Button } from '../../components/Button'
import { Input } from '../../components/Form/Input'
import { withSSRAuth } from '../../utils/withSSRAuth'
import { api } from '../../services/apiClient'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ContentState, EditorState } from 'draft-js'
import { useMutation } from 'react-query'
import { queryClient } from '../../services/queryClient'
import { convertToHTML } from 'draft-convert';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { AxiosError } from 'axios'
import Link from 'next/link'

const TextEditor = dynamic(() => import("../../components/Editor"), {
  ssr: false,
})

type SaveTemplateFormData = {
  title: string;
  content: EditorState;
};

type CreateTemplateFormData = {
  title: string;
  content: string;
}

type yupTestObjectValue = Record<any, any> | EditorState;

const createTemplateFormSchema = yup.object().shape({
  title: yup.string().required('Remetente obrigatório'),
  content: yup.object().test("hasText", "O conteúdo é obrigatório", (value: yupTestObjectValue) => {
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

export default function CreateTemplate() {
  const router = useRouter()
  const toast = useToast()

  const { register, handleSubmit, control, formState } = useForm({
    defaultValues: {
      title: '',
      content: EditorState.createWithContent(ContentState.createFromText('{{ message_content }}')),
    },
    resolver: yupResolver(createTemplateFormSchema)
  });

  const { errors } = formState;

  const createTemplate = useMutation(
    async (template: CreateTemplateFormData) => {
      const response = await api.post('/templates', template);

      return response.data;

    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('templates');

        toast({
          title: 'Template criado com sucesso.',
          status: 'success',
          position: 'top',
          duration: 3000
        })

        router.push('/templates');
      },
      onError: (error: AxiosError) => {
        toast({
          title: error?.response?.data?.error || 'Houve um erro ao criar o template',
          status: 'error',
          position: 'top',
          duration: 3000
        })

      }
    }
  );

  const handleSaveTemplate: SubmitHandler<SaveTemplateFormData> = async data => {
    try { 
      const currentContent = data.content.getCurrentContent();

      const htmlFormattedBody = convertToHTML(renderAsHTMLConfig)(currentContent as any)

      await createTemplate.mutateAsync({
        title: data.title,
        content: htmlFormattedBody,
      });
    } catch {
      console.log('Error happened')
    }
  };

  return (
    <Box>
      <Head>
        <title>Criar template | Umbriel</title>
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
          onSubmit={handleSubmit(handleSaveTemplate)}
        >
          <Flex mb="8" justifyContent="space-between" alignItems="center">
            <Box>
              <Heading size="lg" fontWeight="medium">Criar template</Heading>
            </Box>

            <HStack>
              <Link href="/templates">
                <Button size="md" colorScheme="blackAlpha">
                  Cancelar
                </Button>
              </Link>

              <Button type="submit" size="md" leftIcon={<RiSaveLine size="24" />} colorScheme="pink">
                Salvar
              </Button>
            </HStack>
          </Flex>
          <VStack spacing="6" maxWidth="4xl">
            <Input
              label="Título"
              error={errors.title}
              name="title"
              {...register('title')}
            />

            <TextEditor
              error={errors.content}
              label="Conteúdo"
              description="Inclua {{ message_content }} para injetar o conteúdo da mensagem"
              name="content"
              control={control}
            />
          </VStack>
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