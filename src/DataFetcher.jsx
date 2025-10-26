import { useState, useEffect } from 'react';
import FETCH_URL from './utils.js';
import { Link } from 'react-router-dom';
import React from 'react';
import './App.css'

function FetchData() {
   const [data, setData] = useState([]);

useEffect(() => {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["x-access-token"] = token;
  }

  fetch("http://localhost:8080/", {
    headers
  })
    .then(response => response.json())
    .then(data => setData(Array.isArray(data) ? data : []));
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FetchData;