// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import FetchData from '../DataFetcher.jsx'
// import Add from'./Add.jsx'
// import Edit from'./Update.jsx'
// import TextEditor from'./TextEditor.jsx'
// import SocketIo from'./SocketIo.jsx'
// import Login from'./Login.jsx'
// import Register from'./Register.jsx'
// import Signout from'./Signout.jsx'
// import ShareDoc from'./ShareDoc.jsx'
// import React, { useState, useEffect } from 'react';
// import '../App.css'

// function Home() {
//   return (
//     <div>
//       <h1>Home</h1>
//       <FetchData />
//     </div>
//   );
// }

// function App() {
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     if (savedToken) {
//       setToken(savedToken);
//     }
//   }, []);

//   return (
//     <>
//       <nav className='nav-container'>
//         <Link to="/">Home</Link> |{" "}
//         <Link to="/add">Add</Link> {!token && " | "} {token && " | "}
//         {!token && <Link to="/login">Log in</Link>} {!token && " | "}
//         {!token && <Link to="/register">Register</Link>}
//         {token && <Link to="/signout">Sign out</Link>} 
//       </nav>

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/add" element={<Add />} />
//         <Route path="/update/:id" element={<Edit />} />
//         <Route path="/texteditor/:id" element={<TextEditor />} />
//         <Route path="/socketio/:id" element={<SocketIo />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login setToken={setToken} />} />
//         <Route path="/signout" element={<Signout setToken={setToken} />} />
//         <Route path="/share/:id" element={<ShareDoc />} />   
//       </Routes>
//     </>
//   );
// }

// export default App;
// export { Home };

import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FetchData from '../DataFetcher.jsx'
import Add from'./Add.jsx'
import Edit from'./Update.jsx'
import TextEditor from'./TextEditor.jsx'
import SocketIo from'./SocketIo.jsx'
import Login from'./Login.jsx'
import Register from'./Register.jsx'
import Signout from'./Signout.jsx'
import ShareDoc from'./ShareDoc.jsx'
import React, { useState, useEffect } from 'react';
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
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <>
      <nav className='nav-container'>
        <Link to="/">Home</Link> |{" "}
        <Link to="/add">Add</Link> {!token && " | "} {token && " | "}
        {!token && <Link to="/login">Log in</Link>} {!token && " | "}
        {!token && <Link to="/register">Register</Link>}
        {token && <Link to="/signout">Sign out</Link>} 
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/update/:id" element={<Edit />} />
        <Route path="/texteditor/:id" element={<TextEditor />} />
        <Route path="/socketio/:id" element={<SocketIo />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signout" element={<Signout setToken={setToken} />} />
        <Route path="/share/:id" element={<ShareDoc />} />   
      </Routes>
    </>
  );
}

export default App;
export { Home };