import { Divider, Flex, Heading, Link, VStack } from '@chakra-ui/react'
import Head from 'next/head'
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
        shadow="0 0 20px rgba(0, 0, 0, 0.05)"
      >
        <Heading size="md">
          Fazer login
        </Heading>

        <Divider my={6} />
        
        <VStack spacing={4}>
          <Input name="email" type="email" label="E-mail" />
          <Input name="password" type="password" label="Senha" />
        </VStack>

        <Button type="submit" mt="8">Entrar</Button>

        <Link 
          href="/forgot-password"
          alignSelf="center" 
          textDecor="underline"
          mt={4} 
          fontSize="sm"
          color="gray.600"
          _hover={{ color: 'gray.700' }} 
          _active={{ color: 'gray.800' }} 
        >
          Esqueceu sua senha?
        </Link>
      </Flex>
    </Flex>
  )
}
