import { createRoot } from 'react-dom/client'
import { useState } from 'react'
import '../App.css'

function Add() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onChange = (event) => { setTitle(event.target.value) };
  const onContentChange = (event) => { setContent(event.target.value) };

  // const onSubmit  = (event) => { event.preventDefault()
  // fetch('https://jsramverk-shirin-hsfqftftd8b6d9fn.northeurope-01.azurewebsites.net/add', {
  //   method: "POST",
  //   body: JSON.stringify({ title, content }),
  //   headers: { "Content-Type": "application/json" },
  // })
  // .then((res) => res.json())
  // .then((data) => {
  //   console.log("Dokument sparat:", data);
  // })
  // .catch((err) => console.error("Fel vid fetch:", err));
  //   // .then((res) => console.log(res.json()))
  //   // .then((data) => console.log(data));
  //   setTitle("");
  //   setContent("");
  // };

  const onSubmit = (event) => {
  event.preventDefault();

  fetch('https://jsramverk-shirin-hsfqftftd8b6d9fn.northeurope-01.azurewebsites.net/add', {
    method: "POST",
    body: JSON.stringify({ title, content }),
    headers: { "Content-Type": "application/json" },
  })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error("Serverfel");
      }

      const text = await res.text(); // hämta svaret som text
      if (!text) {
        console.log("Tomt svar från servern!");
        return;
      }

      const data = JSON.parse(text); // om det finns text, parse som JSON
      console.log("Svar från servern:", data);
    })
    .catch((err) => {
      console.error("Fel vid fetch:", err);
    });

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