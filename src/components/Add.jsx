import FETCH_URI from '../utils.js';
import { useState } from 'react'
import '../App.css'

function Add() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onChange = (event) => { setTitle(event.target.value) };
  const onContentChange = (event) => { setContent(event.target.value) };

  const onSubmit  = (event) => { event.preventDefault()
  fetch(`${FETCH_URI}/add`, {
    method: "POST",
    body: JSON.stringify({ title, content }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
    setTitle("");
    setContent("");
  };

  return (
    <div>
      <h1>Skapa dokument</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Titel</label>
        <input type="text" name="title" value={title} onChange={onChange}/>

        <label htmlFor="content">Innehåll</label>
        <textarea name="content" value={content} onChange={onContentChange}>content </textarea>

        <input type="submit" value="Skapa dokument"/>
      </form>
    </div>
  );
}

export default Add