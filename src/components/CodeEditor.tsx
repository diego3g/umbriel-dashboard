import Editor from 'react-simple-code-editor';

import { FormControl, FormLabel, Box, FormErrorMessage, Text } from '@chakra-ui/react'

import { Controller, Control } from 'react-hook-form'

import codeEditorStyles from '../styles/lib/react-simple-code-editor/codeEditorStyles.module.css';
import { highlight, languages } from 'prismjs';

const hightlightWithLineNumbers = (input: string, language: any, languageString: string) =>
highlight(input, language, languageString)
.split("\n")
.map((line, i) => `<span class="${codeEditorStyles.editorLineNumber}">${i + 1}</span>${line}`)
.join("\n");

import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/themes/prism-coy.css';

type FormValues = any;

type EditorProps = {
  name: string;
  control: Control<FormValues>;
  label?: string;
  description?: string;
  error?: any; 
}

export default function CodeEditor({ name, control, label, description, error }: EditorProps) {
  return (
    <FormControl id={name} isInvalid={!!error}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      {description && <Text mb="4" fontSize="small" colorScheme="gray">{description}</Text>}
      <Box>
        <Controller
          name={name}
          control={control}
          render={({
            field: { onChange, value },
          }) => (
            <div className={codeEditorStyles.editor}>
              <Editor
                value={value}
                onValueChange={onChange}
                highlight={code => hightlightWithLineNumbers(code, languages.markup, 'markup')}
              />
            </div>
          )}
          />
      </Box>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
}
