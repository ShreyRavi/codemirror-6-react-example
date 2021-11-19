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

  const completeFromListParameter = [
    {label: "example 1", type: "constant"},
    {label: "example 2", type: "constant"},
    {label: "example 3", type: "constant"},
    {label: "test 1", type: "constant"},
    {label: "test 1", type: "constant"},
    {label: "showcase", type: "constant"},
  ]

  useEffect(() => {
    const state = EditorState.create({
      doc: '(\n\tThis is an example of Code Mirror 6, enabled with the lang-simpleboolean Language Extension and the simpleWhite theme from theme-simple-white AND\n\tinstall both by using npm i lang-simpleboolean and npm i theme-simple-white\n)\nThis is an example, try auto completion by typing \'example 1\', \'test 1\' or \'showcase\'.\nTokens include AND OR NOT.',
      extensions: [
        basicSetup,
        keymap.of([defaultKeymap, indentWithTab]),
        simpleWhite,
        simpleBoolean(),
        simpleBooleanCompletion(completeFromListParameter),
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