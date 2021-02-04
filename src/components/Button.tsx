import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

type ButtonProps = ChakraButtonProps

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <ChakraButton 
      color="white" 
      fontSize="md"
      size="lg" 
      colorScheme="purple"
      {...rest}
    >
      {children}
    </ChakraButton>
  );
}