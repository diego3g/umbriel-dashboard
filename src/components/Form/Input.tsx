import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react'

type InputProps = {
  name: string;
  label?: string;
} & ChakraInputProps;

export function Input({ name, label, ...rest }: InputProps) {
  return (
    <FormControl id={name}>
      {!!label && <FormLabel>{label}</FormLabel>}
      <ChakraInput size="lg" id={name} focusBorderColor="purple.500" {...rest} />
    </FormControl>
  );
}