import { useState, useEffect } from 'react';
import FETCH_URI from './utils.js';
import './App.css'

function FetchData() {
   const [data, setData] = useState([]);

    useEffect(() => {
    fetch(FETCH_URI)
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
                <a href={`/frontend-react/update/${post._id}`}>Uppdatera</a>
                <a href={`/frontend-react/delete/${post._id}`}>Radera</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FetchData;