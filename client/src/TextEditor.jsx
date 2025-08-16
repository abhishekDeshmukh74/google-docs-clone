import { useEffect, useState, useCallback } from 'react';
import Quill from 'quill';
import { io } from 'socket.io-client';

import 'quill/dist/quill.snow.css';

const SAVE_INTERVAL_MS = 2000;
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['bold', 'italic', 'underline'],
  [{ color: [] }, { background: [] }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ align: [] }],
  ['image', 'blockquote', 'code-block'],
  ['clean'],
];

function TextEditor() {
  const [quill, setQuill] = useState();
   const [socket, setSocket] = useState();

  useEffect(() => {
    const s = io(import.meta.env.VITE_SERVER_URL);
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  const editorRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = '';
    const editor = document.createElement('div');
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: 'snow',
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    q.disable();
    q.setText('Loading...');
    setQuill(q);
  }, []);

  return <div id='' className='container' ref={editorRef}></div>;
}

export default TextEditor;
