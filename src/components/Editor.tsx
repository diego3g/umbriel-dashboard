import { default as DraftEditor } from "@draft-js-plugins/editor"
import createEmojiPlugin from '@draft-js-plugins/emoji';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import { Map } from 'immutable';

import { FormControl, FormLabel, Box, FormErrorMessage, Text } from '@chakra-ui/react'

import createLinkPlugin from '@draft-js-plugins/anchor';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
} from '@draft-js-plugins/buttons';

const linkPlugin = createLinkPlugin();

const inlineToolbarPlugin = createInlineToolbarPlugin();

const { InlineToolbar } = inlineToolbarPlugin;

import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import '@draft-js-plugins/emoji/lib/plugin.css';
import '@draft-js-plugins/linkify/lib/plugin.css';
import '@draft-js-plugins/anchor/lib/plugin.css';
import '@draft-js-plugins/inline-toolbar/lib/plugin.css';

import { Controller, Control } from 'react-hook-form'

import editorStyles from '../styles/lib/draft-js/editorStyles.module.css';
import { DefaultDraftBlockRenderMap } from "draft-js";

const emojiPlugin = createEmojiPlugin({
  useNativeArt: true,
})

const linkifyPlugin = createLinkifyPlugin();

const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

const blockRenderMap = Map({
  'unstyled': {
    element: 'p',
  }
});

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

function myBlockStyleFn(contentBlock) {
  const type = contentBlock.getType();

  if (type === 'unstyled') {
    return editorStyles.paragraph;
  }
}

type FormValues = any;

type EditorProps = {
  name: string;
  control: Control<FormValues>;
  label?: string;
  description?: string;
  error?: any; 
}

export default function Editor({ name, control, label, description, error }: EditorProps) {
  return (
    <FormControl id={name} isInvalid={!!error}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      {description && <Text mb="4" fontSize="small" colorScheme="gray">{description}</Text>}
      <Box
        borderColor={!!error ? 'red.500': 'gray.200' }
        borderWidth={2}
        borderRadius={4}
        paddingRight="4"
        paddingLeft="4"
        paddingBottom="4"
      >
        <Controller
          name={name}
          control={control}
          render={({
            field: { onChange, value },
          }) => (
            <div className={editorStyles.editor}>
              <DraftEditor
                blockStyleFn={myBlockStyleFn}
                editorState={value}
                onChange={onChange}
                plugins={[emojiPlugin, linkifyPlugin, inlineToolbarPlugin, linkPlugin ]}
                blockRenderMap={extendedBlockRenderMap}
              />
              <EmojiSuggestions />
              <EmojiSelect />
              <InlineToolbar>
                {
                  (externalProps) => (
                    <>
                      <BoldButton {...externalProps} />
                      <ItalicButton {...externalProps} />
                      <UnderlineButton {...externalProps} />
                      <linkPlugin.LinkButton {...externalProps} />
                    </>
                  )
                }
              </InlineToolbar>
            </div>
          )}
          />
      </Box>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
}
