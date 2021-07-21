import { default as DraftEditor } from "@draft-js-plugins/editor"
import createEmojiPlugin from '@draft-js-plugins/emoji';
import createLinkifyPlugin from '@draft-js-plugins/linkify';

import { FormControl, FormLabel, Box } from '@chakra-ui/react'

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

export default function Editor({ name, control, label }) {
  return (
    <FormControl id={name}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Box borderWidth={1} borderRadius={4} p="4">
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
    </FormControl>
  );
}
