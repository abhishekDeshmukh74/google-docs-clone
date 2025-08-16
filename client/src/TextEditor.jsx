import { useEffect } from "react";
import Quill from 'quill';

import "quill/dist/quill.snow.css";

function TextEditor() {

    useEffect(() => {
        new Quill('#editor', {
            theme: 'snow',
        });
    }, []);

    return (
        <div id='editor'></div>
    )
}

export default TextEditor
