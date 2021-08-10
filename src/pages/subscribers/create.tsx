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

type CreateContactFormData = {
  name: string;
  email: string;
}

const createContactFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().email('Precisa ser um e-mail').required('E-mail obrigatório'),
});


export default function CreateContact() {
  const router = useRouter()
  const toast = useToast()

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createContactFormSchema)
  });

  const { errors } = formState;

  const createContact = useMutation(
    async (contact: CreateContactFormData) => {
      const response = await api.post('/contacts', contact);

      return response.data;

    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('contacts');

        toast({
          title: 'Contato criado com sucesso.',
          status: 'success',
          position: 'top',
          duration: 3000
        })

        router.push('/subscribers');
      },
      onError: (error: AxiosError) => {
        toast({
          title: error?.response?.data?.error || 'Houve um erro ao criar o contato',
          status: 'error',
          position: 'top',
          duration: 3000
        })

      }
    }
  );

  const handleSaveContato: SubmitHandler<CreateContactFormData> = async data => {
    try { 
      await createContact.mutateAsync({
        name: data.name,
        email: data.email,
      });
    } catch {
      console.log('Error happened')
    }
  };

  return (
    <Box>
      <Head>
        <title>Criar contato | Umbriel</title>
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
          onSubmit={handleSubmit(handleSaveContato)}
        >
          <Flex mb="8" justifyContent="space-between" alignItems="center">
            <Box>
              <Heading size="lg" fontWeight="medium">Criar contato</Heading>
            </Box>

            <HStack>
              <Link href="/contacts">
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
              label="Nome"
              error={errors.name}
              name="name"
              {...register('name')}
            />

            <Input
              label="E-mail"
              error={errors.email}
              name="email"
              {...register('email')}
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