import { useRef, useState } from "react"
import { DraftEditorCommand, EditorState, RichUtils } from "draft-js"
import { default as DraftEditor } from "@draft-js-plugins/editor"
import createEmojiPlugin from '@draft-js-plugins/emoji';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import Immutable from 'immutable'

import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import '@draft-js-plugins/emoji/lib/plugin.css';
import '@draft-js-plugins/linkify/lib/plugin.css';

import editorStyles from '../styles/lib/draft-js/editorStyles.module.css';

const emojiPlugin = createEmojiPlugin({
  useNativeArt: true,
})

const linkifyPlugin = createLinkifyPlugin();

const { EmojiSuggestions } = emojiPlugin;

const blockRenderMap = Immutable.Map({
  'unstyled': {
    element: 'p'
  }
});

export default function Editor() {
  const editorRef = useRef(null);

  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty()
  })

  function handleKeyCommand (command: DraftEditorCommand) {
    const newEditorState = RichUtils.handleKeyCommand(editorState, command);

    if (newEditorState) {
      setEditorState(newEditorState)

      return 'handled';
    }

    return 'not-handled';
  };

  return (
    <div className={editorStyles.editor}>
      <DraftEditor
        editorState={editorState}
        onChange={setEditorState}
        plugins={[emojiPlugin, linkifyPlugin]}
        handleKeyCommand={handleKeyCommand}
        ref={editorRef}
        // blockRenderMap={blockRenderMap}
      />
      <EmojiSuggestions />
    </div>
  );
}
