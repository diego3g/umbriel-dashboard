import Head from 'next/head'
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

type CreateTagFormData = {
  title: string;
}

const createTagFormSchema = yup.object().shape({
  title: yup.string().required('O título é obrigatório'),
});

export default function CreateTag() {
  const router = useRouter()
  const toast = useToast()

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      title: '',
    },
    resolver: yupResolver(createTagFormSchema)
  });

  const { errors } = formState;

  const createTag = useMutation(
    async (tag: CreateTagFormData) => {
      const response = await api.post('/tags', tag);

      return response.data;

    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tags');

        toast({
          title: 'Tag criada com sucesso.',
          status: 'success',
          position: 'top',
          duration: 3000
        })

        router.push('/tags');
      },
      onError: (error: AxiosError) => {
        toast({
          title: error?.response?.data?.error || 'Houve um erro ao criar a tag',
          status: 'error',
          position: 'top',
          duration: 3000
        })
      }
    }
  );

  const handleSaveTag: SubmitHandler<CreateTagFormData> = async data => {
    try {
      await createTag.mutateAsync({
        title: data.title,
      });
    } catch {
      console.log('Error happened')
    }
  };

  return (
    <Box>
      <Head>
        <title>Criar tag | Umbriel</title>
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
          onSubmit={handleSubmit(handleSaveTag)}
        >
          <Flex mb="8" justifyContent="space-between" alignItems="center">
            <Box>
              <Heading size="lg" fontWeight="medium">Criar tag</Heading>
            </Box>

            <HStack>
              <Link href="/tags">
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
              label="Título da tag"
              error={errors.title}
              name="title"
              {...register('title')}
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