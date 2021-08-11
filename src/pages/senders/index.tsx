import Head from 'next/head'
import { Box, Flex, Heading, Table, Icon, Tbody, Td, Text, Th, Thead, Tr, Link } from '@chakra-ui/react'

import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { withSSRAuth } from '../../utils/withSSRAuth'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { RiAddLine, RiSearch2Line } from 'react-icons/ri';

import { Input } from '../../components/Form/Input';
import { useSenders } from '../../services/hooks/useSenders'
import { useMutation } from 'react-query'
import { api } from '../../services/apiClient'
import { queryClient } from '../../services/queryClient'
import { Pagination } from '../../components/Pagination'

type SearchSendersFormData = {
  search: string;
};

export default function Senders() {
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const { register, handleSubmit } = useForm();

  const { data, isLoading } = useSenders(page, searchQuery)

  const handleSearchSenders: SubmitHandler<SearchSendersFormData> = async ({ search }) => {
    setPage(1)
    setSearchQuery(search);
  };

  const setDefaultSender = useMutation(
    async (senderId: string) => {
      const response = await api.patch(`/senders/${senderId}/set-as-default`);

      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('senders');
      }
    }
  );

  const handleEditSender = async (senderId: string) => {
    await setDefaultSender.mutateAsync(senderId);
  };

  return (
    <Box>
      <Head>
        <title>Remetentes</title>
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
              <Heading size="lg" fontWeight="medium">Remetentes</Heading>
              <Text mt="1" color="gray.400">Listagem completa de remetentes</Text>
            </Box>

            <Flex>
              <Flex 
                as="form" 
                onSubmit={handleSubmit(handleSearchSenders)}
              >
                <Input
                  name="search"
                  placeholder="Buscar remetentes"
                  {...register('search')}
                />

                <Button
                  size="lg"
                  fontSize="sm"
                  colorScheme="purple"
                  ml="2"
                  disabled={isLoading}
                  isLoading={isLoading}
                >
                  <Icon as={RiSearch2Line} fontSize="16" />
                </Button>
              </Flex>
              
              <Link href="/senders/create">
                <Button
                  size="lg"
                  fontSize="xl"
                  colorScheme="purple"
                  ml="2"
                  maxW={59}
                >
                  <Icon as={RiAddLine} />
                </Button>
              </Link>
            </Flex>
          </Flex>

          <Table>
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>E-mail</Th>
                <Th w="16"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.senders.map(sender => (
                <Tr key={sender.id}>
                  <Td>
                    <Link color="blue.500" title="Ver detalhes">{sender.name}</Link>
                  </Td>
                  <Td>
                    <Text>{sender.email}</Text>
                  </Td>
                  <Td textAlign="right">
                    <Button
                      colorScheme="purple"
                      disabled={sender.isDefault}
                      size="sm"
                      fontSize="sm"
                      onClick={() => handleEditSender(sender.id)}
                    >
                      {sender.isDefault ? 'Definido como padrão' : 'Definir como padrão'}
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Pagination 
            totalCountOfRegisters={data?.totalCount}
            currentPage={page}
            onPageChange={setPage}
            currentCountOfPosts={data?.senders.length}
          />
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