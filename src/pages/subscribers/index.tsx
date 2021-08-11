import Head from 'next/head'
import { Box, Flex, Heading, HStack, Table, Tbody, Td, Text, Th, Thead, Tr, Link as ChakraLink, Icon } from '@chakra-ui/react'

import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { withSSRAuth } from '../../utils/withSSRAuth'
import { useContacts } from '../../services/hooks/useContacts'

import { Input } from '../../components/Form/Input';

import { RiAddLine, RiSearch2Line } from 'react-icons/ri';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Pagination } from '../../components/Pagination'

import Link from 'next/link'

type SearchContactsFormData = {
  search: string;
};

export default function Subscribers() {
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const { register, handleSubmit } = useForm();

  const { data, isLoading } = useContacts(page, searchQuery)

  const handleSearchContacts: SubmitHandler<SearchContactsFormData> = async ({ search }) => {
    setPage(1)
    setSearchQuery(search);
  };

  return (
    <Box>
      <Head>
        <title>Inscritos</title>
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
              <Heading size="lg" fontWeight="medium">Inscritos</Heading>
              <Text mt="1" color="gray.400">Listagem completa de inscritos</Text>
            </Box>

            <Flex>

              <Flex 
                as="form" 
                onSubmit={handleSubmit(handleSearchContacts)}
              >
                <Input
                  name="search"
                  placeholder="Buscar contatos"
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
              <Link href="/subscribers/create">
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
                <Th>Contato</Th>
                <Th>Data de inscrição</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.contacts.map((contact) => (
                <Tr key={contact.id}>
                  <Td>
                    <Link
                      href={`/subscribers/${contact.id}`}
                      passHref
                    >
                      <ChakraLink
                        color="blue.500"
                        title="Ver detalhes"
                      >{contact.email}</ChakraLink>
                    </Link>
                  </Td>
                  <Td color="gray.500">{contact.createdAt}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Pagination 
            totalCountOfRegisters={data?.totalCount}
            currentPage={page}
            onPageChange={setPage}
            currentCountOfPosts={data?.contacts.length}
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