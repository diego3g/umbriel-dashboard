import { Flex, Button, Stack, Text, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link'

import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import { useContext } from 'react';
import { Input } from '../components/Form/Input';
import { AuthContext } from '../contexts/AuthContext';
import Head from 'next/head';
import { Logo } from '../components/Logo';

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
});

export default function SignIn() {
  const { signIn } = useContext(AuthContext);
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  });

  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async data => {
    await signIn(data);
  };

  return (
    <>
      <Head>
        <title>Login | Umbriel Admin</title>
      </Head>
      <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center" flexDirection={['column', 'row']}>
        <Stack p={[6, 8]} spacing="4" mr={[0, 0, 0, 100]}>
          <Logo />
          <Text color="gray.900" letterSpacing="tight" lineHeight="normal" fontSize={["3xl","5xl"]} mb="8" fontWeight="extrabold" maxW={400}>
            Sign In to access the dashboard
          </Text>
          <Text fontSize={["lg", "xl"]} mb="4" maxW={285}>
            If you don't have an account, you can{' '}
            <Link href="register" passHref>
              <ChakraLink color="purple.500" fontWeight="bold">Register here!</ChakraLink>
            </Link>
          </Text>
        </Stack>
        <Flex
          as="form"
          width="100%"
          maxWidth={400}
          p={[6, 8]}
          borderRadius={8}
          flexDirection="column"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing="4">
            <Input
              name="email"
              type="email"
              placeholder="Enter email"
              {...register('email')}
              error={errors.email}
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              {...register('password')}
              error={errors.password}
            />
          </Stack>
          <Button
            type="submit"
            mt="6"
            colorScheme="purple"
            size="lg"
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>
          <Link href="/forgot-password" passHref>
            <ChakraLink alignSelf="center" mt="4">
              <Text color="gray.500">Password recovery</Text>
            </ChakraLink>
          </Link>
        </Flex>
      </Flex>
    </>
  );
}