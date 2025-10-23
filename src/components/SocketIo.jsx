import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import FETCH_URL from '../utils.js';
import { io } from "socket.io-client";
import '../App.css'

function SocketIo() {
  const { id } = useParams();
  const [ title, setTitle] = useState("");
  const [ content, setContent] = useState("");
  const socket = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    socket.current = io("http://localhost:8080");
    fetch(`http://localhost:8080/texteditor/${id}`, {
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
    setContent("");
  }

  function handleContentChange(e) {
    const value = e.target.value;
    setContent(value)
    socket.current.emit("content", value);
  }

   const onSubmit  = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8080/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    })
    .then((res) => res.json())
    .then(() => {
      setTitle("");
      setContent("");
      navigate("/");
    })
  };

  return (
    <>
      <div className='document-container'> 
        <form className="form-container" onSubmit={onSubmit}>
          <label htmlFor="title-field">Title</label>
          <input type="text" id="title-field" name="title-field" value={title} onChange={(e) => setTitle(e.target.value)}/>

          <label htmlFor="content-field">Content</label>
          <textarea id="content-field" value={content} onChange={handleContentChange} ></textarea>

          <button type="button" onClick={clear}>Clear</button>
          <button type="submit">Update document</button>
        </form>

        <div id="output-container">
          <h1>{title}</h1>
          <p>{content}</p>
        </div>
      </div>
    </>
  )
};

export default SocketIo;