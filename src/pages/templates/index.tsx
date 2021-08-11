import Head from 'next/head'
import { Box, Flex, Heading, Table, Tbody, Td, Text, Th, Thead, Tr, Link, Icon } from '@chakra-ui/react'
import { RiAddLine, RiSearch2Line } from 'react-icons/ri';

import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'
import { Pagination } from '../../components/Pagination'
import { Button } from '../../components/Button'
import { withSSRAuth } from '../../utils/withSSRAuth'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTemplates } from '../../services/hooks/useTemplates'

import { Input } from '../../components/Form/Input';
import { queryClient } from '../../services/queryClient';
import { useMutation } from 'react-query';
import { api } from '../../services/apiClient';

type SearchTemplatesFormData = {
  search: string;
};

export default function Templates() {
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const { register, handleSubmit } = useForm();

  const { data, isLoading } = useTemplates(page, searchQuery)

  const handleSearchContacts: SubmitHandler<SearchTemplatesFormData> = async ({ search }) => {
    setPage(1)
    setSearchQuery(search);
  };

  const setDefaultTemplate = useMutation(
    async (templateId: string) => {
      const response = await api.patch(`/templates/${templateId}/set-as-default`);

      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('templates');
      }
    }
  );

  const handleSetDefaultTemplate = async (templateId: string) => {
    await setDefaultTemplate.mutateAsync(templateId);
  };

  return (
    <Box>
      <Head>
        <title>Templates</title>
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
              <Heading size="lg" fontWeight="medium">Templates</Heading>
              <Text mt="1" color="gray.400">Listagem completa de templates</Text>
            </Box>

            <Flex>
              <Flex 
                as="form" 
                onSubmit={handleSubmit(handleSearchContacts)}
              >
                <Input
                  name="search"
                  placeholder="Buscar templates"
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
              <Link href="/templates/create">
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
                <Th>Template</Th>
                <Th w="16"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.templates.map(template => (
                <Tr key={template.id}>
                  <Td>
                    <Link color="blue.500" title="Ver detalhes">{template.title}</Link>
                  </Td>
                
                  <Td textAlign="right">
                    <Button
                      colorScheme="purple"
                      disabled={template.isDefault}
                      size="sm"
                      fontSize="sm"
                      onClick={() => handleSetDefaultTemplate(template.id)}
                    >
                      {template.isDefault ? 'Definido como padrão' : 'Definir como padrão'}
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
            currentCountOfPosts={data?.templates.length}
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