import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import FETCH_URL from './utils.js';
import './App.css'

function FetchData() {
   const [data, setData] = useState([]);

    useEffect(() => {
    fetch(FETCH_URL)
    .then(response => response.json())
    .then(data => {
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FetchData;