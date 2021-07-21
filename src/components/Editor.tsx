import { default as DraftEditor } from "@draft-js-plugins/editor"
import createEmojiPlugin from '@draft-js-plugins/emoji';
import createLinkifyPlugin from '@draft-js-plugins/linkify';

import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import '@draft-js-plugins/emoji/lib/plugin.css';
import '@draft-js-plugins/linkify/lib/plugin.css';

import { Controller } from 'react-hook-form'

import editorStyles from '../styles/lib/draft-js/editorStyles.module.css';
import { convertToRaw, DraftEditorCommand, EditorState, RichUtils } from "draft-js";

const emojiPlugin = createEmojiPlugin({
  useNativeArt: true,
})

const linkifyPlugin = createLinkifyPlugin();

const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

export default function Editor({ name, control }) {
  return (
    <div className={editorStyles.editor}>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
        }) => (
          <>
            <DraftEditor
              editorState={value}
              onChange={onChange}
              plugins={[emojiPlugin, linkifyPlugin]}
            />
            <EmojiSuggestions />
            <EmojiSelect />
          </>
        )}
      />
    </div>
  );
}
