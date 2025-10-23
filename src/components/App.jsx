import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import FetchData from '../DataFetcher.jsx'
import Add from'./Add.jsx'
import Edit from'./Update.jsx'
import TextEditor from'./TextEditor.jsx'
import SocketIo from'./SocketIo.jsx'
import Login from'./Login.jsx'
import Register from'./Register.jsx'
import React from 'react';
import '../App.css'

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <FetchData />
    </div>
  );
}

function App() {
  return (
    <>
      <nav className='nav-container'>
        <Link to="/">Home</Link> |{" "}
        <Link to="/add">Add</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/register">Register</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/update/:id" element={<Edit />} />
        <Route path="/texteditor/:id" element={<TextEditor />} />
        <Route path="/socketio/:id" element={<SocketIo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
export { Home };