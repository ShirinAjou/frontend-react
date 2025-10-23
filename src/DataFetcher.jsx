import { useState, useEffect } from 'react';
import FETCH_URL from './utils.js';
import { Link } from 'react-router-dom';
import React from 'react';
import './App.css'

function FetchData() {
   const [data, setData] = useState([]);

    useEffect(() => {
    fetch(FETCH_URL)
    .then(response => response.json())
    .then(data => {
        setData(data);
        console.log("Fetched data:", data);
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
                <Link to={`/texteditor/${post._id}`}>CodeMirror</Link>
                {/* <a href={`/frontend-react/update/${post._id}`}>Update</a>
                <a href={`/frontend-react/texteditor/${post._id}`}>CodeMirror</a> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FetchData;