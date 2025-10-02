import { useState, useEffect } from 'react';
import FETCH_URI from './utils.js';

function FetchData() {
   const [data, setData] = useState(null);

   useEffect(() => {
    fetch(`${FETCH_URI}`)
    .then(response => response.json())
    .then(data => setData(data));
    console.log(data) 
    }, []);
    return (
    <div>
        {data && data.map(post => (
        <div key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
        </div>
        ))}
    </div>
    );
}

export default FetchData;