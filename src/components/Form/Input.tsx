import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps, useColorModeValue } from '@chakra-ui/react'

type InputProps = {
  name: string;
  label?: string;
} & ChakraInputProps;

export function Input({ name, label, ...rest }: InputProps) {
  const textColor = useColorModeValue("gray.700", "gray.50")
  
  return (
    <FormControl id={name}>
      {!!label && <FormLabel color={textColor}>{label}</FormLabel>}
      <ChakraInput
        id={name}
        variant="filled"
        focusBorderColor="pink.500"
        bgColor="gray.900"
        _hover={{
          bgColor: 'gray.900'
        }}
        {...rest}
      />
    </FormControl>
  );
}