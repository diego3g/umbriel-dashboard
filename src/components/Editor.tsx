import { default as DraftEditor } from "@draft-js-plugins/editor"
import createEmojiPlugin from '@draft-js-plugins/emoji';
import createLinkifyPlugin from '@draft-js-plugins/linkify';

import { FormControl, FormLabel, Box, FormErrorMessage, Text } from '@chakra-ui/react'

import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import '@draft-js-plugins/emoji/lib/plugin.css';
import '@draft-js-plugins/linkify/lib/plugin.css';

import { Controller } from 'react-hook-form'

import editorStyles from '../styles/lib/draft-js/editorStyles.module.css';

const emojiPlugin = createEmojiPlugin({
  useNativeArt: true,
})

const linkifyPlugin = createLinkifyPlugin();

const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

export default function Editor({ name, control, label, description, error }) {
  return (
    <FormControl id={name} isInvalid={!!error}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      {description && <Text mb="4" fontSize="small" colorScheme="gray">{description}</Text>}
      <Box borderColor={!!error ? 'red.500': 'gray.200'} borderWidth={2} borderRadius={4} p="4">
        <Controller
          name={name}
          control={control}
          render={({
            field: { onChange, value },
          }) => (
            <div className={editorStyles.editor}>
              <DraftEditor
                editorState={value}
                onChange={onChange}
                plugins={[emojiPlugin, linkifyPlugin]}
              />
              <EmojiSuggestions />
              <EmojiSelect />
            </div>
          )}
          />
      </Box>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
}
