import FETCH_URL from '../utils.js';
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router";
import React from 'react';
import '../App.css'

function Edit() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${FETCH_URL}/update/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.json())
    .then((data) => {
      setTitle(data.title);
      setContent(data.content)});
    }, [id]);

  const onChange = (event) => { setTitle(event.target.value) };
  const onContentChange = (event) => { setContent(event.target.value) };

  const onSubmit  = (event) => { event.preventDefault()
  fetch(`${FETCH_URL}/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  })
    .then((res) => res.json())
    .then(data => {
      console.log("Update response from backend:", data);
      setTitle("");
      setContent("");
      navigate("/");
    });
  };
  
  return (
    <div>
      <h1>Edit document</h1>
      <form className="form-container" onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" value={title} onChange={onChange} required />

        <label htmlFor="content">Content</label>
        <textarea name="content" value={content} onChange={onContentChange}></textarea>

        <input type="submit" value="Update document"/>
      </form>
    </div>
  );
}
export default Edit;