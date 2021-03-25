import { Button as ChakraButton, ButtonProps as ChakraButtonProps, useColorModeValue } from '@chakra-ui/react';

type ButtonProps = ChakraButtonProps

export function Button({ children, ...rest }: ButtonProps) {
  const buttonColor = useColorModeValue("white", "gray.900")

  return (
    <ChakraButton 
      color={buttonColor}
      fontSize="md"
      size="lg" 
      colorScheme="purple"
      {...rest}
    >
      {children}
    </ChakraButton>
  );
}