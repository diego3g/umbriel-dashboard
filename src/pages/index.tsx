import { Divider, Flex, Heading, Link, useColorModeValue, VStack, Text } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import { Button } from '../components/Button';

import { Input } from '../components/Form/Input';

export default function Login() {
  const router = useRouter();

  const textColor = useColorModeValue("gray.700", "gray.50")
  const shapeBg = useColorModeValue("white", "gray.800")

  const linkColor = useColorModeValue("gray.600", "white")

  function handleSignIn(e: FormEvent) {
    e.preventDefault();
    
    router.push('/dashboard')
  }

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
        backgroundColor={shapeBg}
        flexDir="column"
        borderRadius={4}
        shadow="0 0 20px rgba(0, 0, 0, 0.05)"
      >
        <Heading size="md" color={textColor}>
          Fazer login
        </Heading>

        <Divider my={6} />
        
        <VStack spacing={4}>
          <Input name="email" type="email" label="E-mail" w="100%" />
          <Input name="password" type="password" label="Senha" w="100%" />
        </VStack>

        <Button type="submit" mt="8" onClick={handleSignIn}>Entrar</Button>

        <Link 
          href="/forgot-password"
          alignSelf="center" 
          textDecor="underline"
          mt={4} 
          fontSize="sm"
          color={linkColor}
          _hover={{ filter: 'brightness(0.5)' }} 
          _active={{ color: 'gray.800' }} 
        >
          Esqueceu sua senha?
        </Link>
      </Flex>
    </Flex>
  )
}