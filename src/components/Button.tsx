import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

type ButtonProps = ChakraButtonProps

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <ChakraButton 
      bg="purple.500" 
      _hover={{ bg: 'purple.600' }} 
      _active={{ bg: 'purple.700' }} 
      color="white" 
      fontSize="md"
      w="100%" 
      size="lg" 
      {...rest}
    >
      {children}
    </ChakraButton>
  );
}