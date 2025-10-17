import { useState, useEffect, useRef } from 'react';
import FETCH_URL from './utils.js';
import { io } from "socket.io-client";
import './App.css'

let socket;

function TextEditor() {
  const [ title, setTitle] = useState("");
  const [ content, setContent] = useState("");

  const socket = useRef(null);

  useEffect(() => {
    socket.current = io(FETCH_URL);

    socket.current.on("content", (data) => {
      setContent(data);
    });

    return () => {
      socket.current.disconnest();
    }
  }, []);

  function clear(e) {
    e.preventDefault();

    setTitle("");
    setContent("");
  }

  
};

export default TextEditor;