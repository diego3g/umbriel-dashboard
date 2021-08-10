import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

export function InputComponent({ name, label, error = null, ...rest }: InputProps, ref) {
  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        id={name}
        name={name}
        variant="outline"
        focusBorderColor="purple.500"
        _hover={{
          bgColor: 'gray.100'
        }}
        size="lg"
        {...rest}
        ref={ref}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
}

export const Input = forwardRef(InputComponent)