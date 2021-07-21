import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface SelectProps extends ChakraSelectProps {
  name: string;
  label?: string;
  error?: FieldError;
}

export function SelectComponent({ name, label, error = null, ...rest }: SelectProps, ref) {
  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraSelect
        id={name}
        name={name}
        size="lg"
        variant="outline"
        focusBorderColor="purple.500"
        _hover={{
          bgColor: 'gray.100'
        }}
        {...rest}
        ref={ref}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
}

export const Select = forwardRef(SelectComponent)