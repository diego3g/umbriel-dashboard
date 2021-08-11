import Head from 'next/head'
import { Box, Flex, Heading, HStack, Table, Icon, Tbody, Td, Text, Th, Thead, Tr, Link } from '@chakra-ui/react'

import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { withSSRAuth } from '../../utils/withSSRAuth'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { RiAddLine, RiSearch2Line } from 'react-icons/ri';

import { Input } from '../../components/Form/Input';
import { useTags } from '../../services/hooks/useTags'
import { Pagination } from '../../components/Pagination'


type SearchTagsFormData = {
  search: string;
};

export default function Tags() {
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const { register, handleSubmit } = useForm();

  const { data, isLoading } = useTags(page, searchQuery)

  const handleSearchTags: SubmitHandler<SearchTagsFormData> = async ({ search }) => {
    setPage(1)
    setSearchQuery(search);
  };

  return (
    <Box>
      <Head>
        <title>Tags</title>
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
              <Heading size="lg" fontWeight="medium">Tags</Heading>
              <Text mt="1" color="gray.400">Listagem completa de tags</Text>
            </Box>

            <Flex>
              <Flex 
                as="form" 
                onSubmit={handleSubmit(handleSearchTags)}
              >
                <Input
                  name="search"
                  placeholder="Buscar tags"
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
              <Link href="/tags/create">
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
                <Th>Tag</Th>
                <Th>Inscritos</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.tags.map(tag => (
                <Tr key={tag.id}>
                  <Td>
                    <Link color="blue.500" title="Ver detalhes">{tag.title}</Link>
                  </Td>
                  <Td>
                    <Text>{tag.subscribersCount}</Text>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Pagination 
            totalCountOfRegisters={data?.totalCount}
            currentPage={page}
            onPageChange={setPage}
            currentCountOfPosts={data?.tags.length}
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