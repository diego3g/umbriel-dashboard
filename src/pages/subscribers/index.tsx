import Head from 'next/head'
import { Box, Flex, Heading, HStack, Table, Tbody, Td, Text, Th, Thead, Tr, Link, Icon } from '@chakra-ui/react'

import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { withSSRAuth } from '../../utils/withSSRAuth'
import { useContacts } from '../../services/hooks/useContacts'

import { Input } from '../../components/Form/Input';

import { RiSearch2Line } from 'react-icons/ri';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type SearchContactsFormData = {
  search: string;
};

export default function Subscribers() {
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const { register, handleSubmit } = useForm();

  const { data } = useContacts(page, searchQuery)

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

            <Flex 
              as="form" 
              onSubmit={handleSubmit(handleSearchContacts)}
            >
              <Input
                name="search"
                placeholder="Search contacts"
                {...register('search')}
              />

              <Button
                size="lg"
                fontSize="sm"
                colorScheme="purple"
                ml="2"
              >
                <Icon as={RiSearch2Line} fontSize="16" />
              </Button>
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
                <Tr>
                  <Td>
                    <Link color="blue.500" title="Ver detalhes">{contact.email}</Link>
                  </Td>
                  <Td color="gray.500">{contact.createdAt}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Flex mt="8" justifyContent="space-between" alignItems="center">
            <Box>
              <Text fontSize="md" color="gray.600">
                <strong>1</strong> - <strong>10</strong> de <strong>48</strong>
              </Text>
            </Box>

            <HStack spacing="2">
              <Button size="md" width="4">1</Button>
              <Button size="md" width="4" bgColor="gray.300">2</Button>
              <Button size="md" width="4" bgColor="gray.300">3</Button>
              <Button size="md" width="4" bgColor="gray.300">4</Button>
              <Text color="gray.500" px="2">...</Text>
              <Button size="md" width="4" bgColor="gray.300">67</Button>
              <Button size="md" width="4" bgColor="gray.300">68</Button>
            </HStack>
          </Flex>
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