import { useState, useEffect } from 'react';
import FETCH_URL from './utils.js';
import React from 'react';
import './App.css'

function FetchData() {
   const [data, setData] = useState([]);

    useEffect(() => {
    fetch(`${FETCH_URL}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
        setData(data);
    });
    }, []);

    return (
    <div>
      <table className="table-container" border="1">
        <thead>
          <tr>
            <th>Titel</th>
            <th>Åtgärd</th>
          </tr>
        </thead>
        <tbody>
          {data.map((post) => (
            <tr key={post._id}>
              <td>{post.title}</td>
              <td>
                <Link to={`/update/${post._id}`}>Uppdatera</Link>
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