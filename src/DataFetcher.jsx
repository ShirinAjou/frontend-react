import { useState, useEffect } from 'react';
import FETCH_URL from './utils.js';
import { Link } from 'react-router-dom';
import React from 'react';
import './App.css'

function FetchData() {
   const [data, setData] = useState([]);
   const [token, setToken] = useState(null);

useEffect(() => {
  const savedToken = localStorage.getItem("token");
  if (savedToken) {
    setToken(savedToken);
  }

  const headers = { "Content-Type": "application/json" };
  if (savedToken) {
    headers["x-access-token"] = savedToken;
  }

  fetch(FETCH_URL, {
    headers
  })
    .then(response => response.json())
    .then(data => {if (Array.isArray(data)) {
      setData(data)
    } else {
      setData([])}
    });
  }, []);

    return (
    <div>
      <table className="table-container" border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((post) => (
            <tr key={post._id}>
              <td>{post.title}</td>
              <td>
                <Link to={`/update/${post._id}`}>Update</Link>
                <Link to={`/socketio/${post._id}`}>Socket</Link>
                <Link to={`/texteditor/${post._id}`}>CodeMirror</Link>
                {token && <Link to={`/share/${post._id}`}>Share</Link>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FetchData;