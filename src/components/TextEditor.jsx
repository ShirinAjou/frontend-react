import { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router";
import FETCH_URL from '../utils.js';
import CodeMirror from '@uiw/react-codemirror';
import { io } from "socket.io-client";
import '../App.css'

function TextEditor() {
  const { id } = useParams();
  const [ title, setTitle] = useState("");
  const [ content, setContent] = useState("");
  const [isCodeMode, setIsCodeMode] = useState(false);
  const [output, setOutput] = useState("");
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io(`${FETCH_URL}`);
  
    fetch(`${FETCH_URL}/texteditor/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.json())
    .then((data) => {
      setTitle(data.title || "");
      setContent(data.content || "");
      socket.current.emit("create", data._id);
      socket.current.emit("doc", data);
    });

    socket.current.on("doc", (data) => {
      setContent(data.content);
    });
    
    socket.current.on("content", (data) => {   
      if (typeof data.content === "string") {
        setContent(data.content);
      } else {
        console.warn("Felaktig content-data:", data);
      }
    });

    return () => {
      socket.current.disconnect();
    }
  }, [id]);

  function clear() {
    setTitle("");
    setContent("");
  }

  function handleContentChange(e) {
    const value = e.target.value;
    setContent(value);
    socket.current.emit("content", { room: id, content: value });
  }

  function handleContentChangeMirror(value) {
    setContent(value);
    socket.current.emit("content", { room: id, content: value });
  }

  function saveData() {
    fetch(`${FETCH_URL}/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        content
      })
    })
    .then(res => res.json())
    .then(result => {
      console.log("Dokument sparat:", result);
    })
    .catch(err => {
      console.error("Fel vid sparning:", err);
    });
  }

  function runCode() {
    const data = btoa(content);

    fetch("https://execjs.emilfolino.se/code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        code: data
      })
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Serverfel: ${res.status}`);
      }
      return res.json();
    })
    .then(result => {
      const decodedOutput = atob(result.data);
      setOutput(decodedOutput);
    })
    .catch(err => {
      console.error("Fel vid exekvering:", err);
      setOutput("Fel vid exekvering: " + err.message);
    });
  }

  return (
    <>
      <div className='document-container'>
        <h1>CodeMirror</h1>
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
        <button className="button" onClick={runCode}>Run code</button>
        <button className="button"  onClick={saveData}>Save</button>

        <div className="output" id="output-container">
          <h1>{title}</h1>
            <CodeMirror
                value={output}
                editable={false}
                className="codemirror output"
              />
        </div>
      </div>
    </>
  )
};

export default TextEditor;