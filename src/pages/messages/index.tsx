import Head from 'next/head'
import { Box, Flex, Heading, HStack, Table, Icon, Tbody, Td, Text, Th, Thead, Tr, Link as ChakraLink, StackDivider } from '@chakra-ui/react'

import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { withSSRAuth } from '../../utils/withSSRAuth'
import { Pagination } from '../../components/Pagination'
import { useMessages } from '../../services/hooks/useMessages'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { RiSearch2Line, RiAddLine } from 'react-icons/ri';

import { Input } from '../../components/Form/Input';

import Link from 'next/link'
import { MessageItem } from '../../components/MessageItem'

type SearchMessagesFormData = {
  search: string;
};

export default function Messages() {
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const { register, handleSubmit } = useForm();

  const { data, isLoading } = useMessages(page, searchQuery)

  const handleSearchMessages: SubmitHandler<SearchMessagesFormData> = async ({ search }) => {
    setPage(1)
    setSearchQuery(search);
  };

  return (
    <Box>
      <Head>
        <title>Mensagens</title>
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
              <Heading size="lg" fontWeight="medium">Mensagens</Heading>
              <Text mt="1" color="gray.400">Listagem completa de mensagens</Text>
            </Box>

            <Flex>
              <Flex 
                as="form" 
                onSubmit={handleSubmit(handleSearchMessages)}
              >
                <Input
                  name="search"
                  placeholder="Search messages"
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
                  <Icon as={RiSearch2Line} />
                </Button>
              </Flex>
              <Link href="/messages/create">
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
                <Th>Mensagem</Th>
                <Th>Enviada em</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.messages.map(message => (
                <MessageItem message={message} />
              ))}
            </Tbody>
          </Table>

          <Pagination 
            totalCountOfRegisters={data?.totalCount}
            currentPage={page}
            onPageChange={setPage}
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