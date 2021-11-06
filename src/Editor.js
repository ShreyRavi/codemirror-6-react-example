import React, { useRef, useEffect, useState } from 'react';

import { EditorState, basicSetup } from '@codemirror/basic-setup';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { simpleBooleanCompletion, simpleBoolean } from 'lang-simpleboolean';
import { simpleWhite } from 'theme-simple-white';
import './Editor.css';

const Editor = ({setEditorState}) => {
  const editor = useRef();
	const [code, setCode] = useState("");

  const onUpdate = EditorView.updateListener.of((v) => {
      setCode(v.state.doc.toString());
  });

  useEffect(() => {
    const state = EditorState.create({
      doc: 'This is an example of CodeMirror 6 on React with JavaScript highlighting.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
      extensions: [
        basicSetup,
        keymap.of([defaultKeymap, indentWithTab]),
        simpleWhite,
        simpleBoolean(),
        simpleBooleanCompletion([{ label: "test", type: "constant" }]),
        onUpdate,
      ],
    });

    const view = new EditorView({ state, parent: editor.current });

    return () => {
      view.destroy();
    };
  }, []);

  return(
  <div className="EditorWrapper">
      <h1 className="EditorHeading">CodeMirror 6 React Example</h1>
      <div className="Editor" ref={editor}></div>
  </div>
  );
};

export default Editor;