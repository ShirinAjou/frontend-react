import FETCH_URL from '../utils.js';
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router";
import '../App.css'

function Edit() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${FETCH_URI}/update/${id}`, {
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
  fetch(`${FETCH_URI}/update`, {
    method: "POST",
    body: JSON.stringify({ id, title, content }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      setMessage("Dokumentet har uppdaterats")
      setTitle("");
      setContent("");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    })

  return (
    <div>
      <h1>Redigera dokument</h1>
      {message && <p className="confirmation">{message}</p>}
      <form className="form-container" onSubmit={onSubmit}>
        <label htmlFor="title">Titel</label>
        <input type="text" name="title" value={title} onChange={onChange} required />

        <label htmlFor="content">Innehåll</label>
        <textarea name="content" value={content} onChange={onContentChange}></textarea>

        <input type="submit" value="Uppdatera dokument"/>
      </form>
    </div>
  );
  }
}
export default Edit;