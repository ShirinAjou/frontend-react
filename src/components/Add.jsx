import FETCH_URL from '../utils.js';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'

function Add() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const onChange = (event) => { setTitle(event.target.value) };
  const onContentChange = (event) => { setContent(event.target.value) };

  const onSubmit  = (event) => { event.preventDefault()
  fetch(`http://localhost:8080/add`, {
    method: "POST",
    body: JSON.stringify({ title, content }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => data);
    setTitle("");
    setContent("");
    navigate("/");
  };

  return (
    <div>
      <h1>Create document</h1>
      <form className="form-container" onSubmit={onSubmit} data-testid="add-form">
        <label htmlFor="title">Title</label>
        <input id="title" className="action-content" type="text" name="title" value={title} onChange={onChange} required />

        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" value={content} onChange={onContentChange}></textarea>

        <input className="btn-container" type="submit" value="Create document"/>
      </form>
    </div>
  );
}

export default Add