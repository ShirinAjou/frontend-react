import { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router";
import FETCH_URL from '../utils.js';
import { io } from "socket.io-client";
import CodeMirror from '@uiw/react-codemirror';
import '../App.css'


// 1. Add a code editor to your project, like CodeMirror or Monaco Editor. fixat
// 2. Allow users to choose between a regular document and a code document. fixat
// 3. Save the document type in your database. 
// 4. Create a button to execute code by sending it to an endpoint.

function TextEditor() {
  const { id } = useParams();
  const [ title, setTitle] = useState("");
  const [ content, setContent] = useState("");
  const [isCodeMode, setIsCodeMode] = useState(false);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io(FETCH_URL);
    fetch(`${FETCH_URL}/texteditor/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.json())
    .then((data) => {
      setTitle(data.title);
      setContent(data.content);
      socket.current.emit("create", data._id);
      socket.current.emit("doc", data);
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

  function saveData() {
    let encode = { code: btoa(content) }
    fetch("https://execjs.emilfolino.se/code", {    
      // body: JSON.stringify({
      //   id,
      //   title,
      //   content,
      // }),
      body: JSON.stringify(
        encode
      ),
      headers: {
          'content-type': 'application/json'
      },
      method: 'POST'
    })
    .then(function (response) {
        return response.json();
    })
    .then(function(result) {
        let decodedOutput = atob(result.data);
        console.log('result' + decodedOutput);
    });
  }

  return (
    <>
      <div className='document-container'> 
        <label htmlFor="title-field">Title</label>
        <input type="text" id="title-field" name="title-field" value={title} 
        onChange={(e) => setTitle(e.target.value)} />

        <label htmlFor="content-field">Content</label>

        {isCodeMode ? <CodeMirror value={content} onChange={handleContentChangeMirror} className="codemirror"/> : <textarea id="content-field" value={content} 
        onChange={handleContentChange}></textarea>}


        <div className="switch-container">
          <span className="switch-label">Switch to code-mode</span>
          <label className="switch">
            <input type="checkbox" onChange={(e) => setIsCodeMode(e.target.checked)} />
            <span className="slider round"></span>
          </label>
        </div>


        <button className="button" id="print-message" onClick={clear}>Clear</button>

        <button className="button"  onClick={saveData}>Save</button>

        <div className="output" id="output-container">
          <h1>{title}</h1>
          <p>{content}</p>
        </div>
      </div>
    </>
  )
};

export default TextEditor;