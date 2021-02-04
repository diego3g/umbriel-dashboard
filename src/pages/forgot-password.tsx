import Head from 'next/head'
import { Divider, Flex, Heading, Link, Text, VStack } from '@chakra-ui/react'

import { Button } from '../components/Button';
import { Input } from '../components/Form/Input';

export default function Home() {
  return (
    <Flex 
      w="100vw" 
      h="100vh" 
      align="center" 
      justify="center"
    >
      <Head>
        <title>Fazer login</title>
      </Head>

      <Flex 
        as="form" 
        w="100%" 
        maxWidth={400} 
        padding={8} 
        bg="white" 
        flexDir="column"
        borderRadius={4}
        shadow="0 0 50px rgba(0, 0, 0, 0.1)"
      >
        <Heading size="md">
          Fazer login
        </Heading>

        <Divider my={6} />
        
        <VStack spacing={4}>
          <Input name="email" type="email" label="E-mail" />
        </VStack>

        <Button type="submit" mt="8">Entrar</Button>

        <Link 
          href="/"
          alignSelf="center" 
          textDecor="underline"
          mt={4} 
          fontSize="sm"
          color="gray.600"
          _hover={{ color: 'gray.700' }} 
          _active={{ color: 'gray.800' }} 
        >
          Voltar ao login
        </Link>
      </Flex>
    </Flex>
  )
}
