import { useState, useEffect } from 'react';

function FetchData() {
   const [data, setData] = useState(null);

   useEffect(() => {
    fetch('https://jsramverk-shirin-hsfqftftd8b6d9fn.northeurope-01.azurewebsites.net/')
    .then(response => response.json())
    .then(data => setData(data));
    console.log(data) 
    }, []);
    return (
    <div>
        {data && data.map(post => (
        <div key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </div>
        ))}
    </div>
    );
}

export default FetchData;