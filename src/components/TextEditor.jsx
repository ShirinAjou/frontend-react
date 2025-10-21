import { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router";
import FETCH_URL from '../utils.js';
import { io } from "socket.io-client";
import CodeMirror from '@uiw/react-codemirror';
import '../App.css'

function TextEditor() {
  const { id } = useParams();
  const [ title, setTitle] = useState("");
  const [ content, setContent] = useState("");
  const [isCodeMode, setIsCodeMode] = useState(false);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io(FETCH_URL, {
      transports: ["polling"]
    });
    fetch(`http://localhost:8080/texteditor/${id}`)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  })
  .then(data => {
    setTitle(data.title || "");
    setContent(data.content || "");
    socket.current.emit("create", data._id);
    socket.current.emit("doc", data);
  })
  .catch(err => {
    console.error("Fetch error:", err);
    // optionally show error in UI
  });
    socket.current.on("doc", (data) => {
      setContent(data.content, false);
    });
    
    socket.current.on("content", (data) => {
      setContent(data);
    });

    return () => {
      socket.current.disconnect();
    }
  }, [id]);

  function clear(e) {
    e.preventDefault();
    setTitle("");
    setContent("");
  }

  function handleContentChange(e) {
    const value = e.target.value;
    setContent(value)
    socket.current.emit("content", value);
  }

  function handleContentChangeMirror(e) {
    setContent(e)
    socket.current.emit("content", e);
  }

  return (
    <>
      <div className='document-container'> 
        <label htmlFor="title-field">Title</label>
        <input type="text" id="title-field" name="title-field" value={title} 
        onChange={(e) => setTitle(e.target.value)} />

        <label htmlFor="content-field">Content</label>

        {isCodeMode ? <CodeMirror value={content} onChange={handleContentChangeMirror} /> : <textarea id="content-field" value={content} 
        onChange={handleContentChange}></textarea>}

        <label className="switch">
          <input type="checkbox" onChange={(e) => setIsCodeMode(e.target.checked)} />
          <span className="slider round"></span>
        </label>

        <button id="print-message" onClick={clear}>Clear</button>

        <div id="output-container">
          <h1>{title}</h1>
          <p>{content}</p>
        </div>
      </div>
    </>
  )
};

export default TextEditor;