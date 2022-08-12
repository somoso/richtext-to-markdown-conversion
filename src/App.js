import './App.css';
import React from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import draftToMarkdown from 'draftjs-to-markdown';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {CopyToClipboard} from "react-copy-to-clipboard/src";


function App() {
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );
    const [mkdn, setMkdn] = React.useState();

    function onChange(es) {
        setEditorState(es);
        const raw = convertToRaw(es.getCurrentContent());
        const rawMarkDown = draftToMarkdown(raw);
        setMkdn(rawMarkDown);
    }

    function reset() {
        setEditorState(EditorState.createEmpty())
        setMkdn(null);
    }

    console.log('markdown', mkdn)

    return <div>
        <h1>Rich Text to Markdown Conversion</h1>
        <div>
            <h2>Rich Text:</h2>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarStyle"
                editorClassName="markdownText"
                onEditorStateChange={onChange}
            />
            <button type="button" className="copyButton" onClick={reset}>Reset</button>
        </div>
        <div>
            <h2>Converted Markdown:</h2>
            <div className="markdownText">
                {mkdn}
            </div>
            <div>
                <br />
                {mkdn && !!mkdn && typeof mkdn === "string" && (!!mkdn.trim()) &&
                <CopyToClipboard text={mkdn}>
                    <button type="button" className="copyButton">Copy to clipboard</button>
                </CopyToClipboard>}
            </div>
        </div>
    </div>;
}

export default App;
