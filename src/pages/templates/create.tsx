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
import { useMutation } from 'react-query'
import { queryClient } from '../../services/queryClient'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { AxiosError } from 'axios'
import Link from 'next/link'

const CodeEditor = dynamic(() => import("../../components/CodeEditor"), {
  ssr: false,
})

type SaveTemplateFormData = {
  title: string;
  content: string;
};

type CreateTemplateFormData = {
  title: string;
  content: string;
}

const createTemplateFormSchema = yup.object().shape({
  title: yup.string().required('Título obrigatório'),
  content: yup.string().test('hasMessageContent', 'Necessário ter a variável {{ message_content }} no conteúdo', (value) => {
    return value.includes('{{ message_content }}')
  }).required('Conteúdo obrigatório'),
});


export default function CreateTemplate() {
  const router = useRouter()
  const toast = useToast()

  const { register, handleSubmit, control, formState } = useForm({
    defaultValues: {
      title: '',
      content: '{{ message_content }}',
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
      await createTemplate.mutateAsync({
        title: data.title,
        content: data.content,
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

            <CodeEditor
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