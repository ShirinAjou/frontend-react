import { useState, useEffect } from 'react';

function FetchData() {
   const [data, setData] = useState(null);

   useEffect(() => {
    fetch('https://github.com/LillaMy-droid/jsramverk.git')
    .then(response => response.json())
    .then(data => setData(data));
    }, []);

    return (
    <div>
        {data && data.map(post => (
        <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </div>
        ))}
    </div>
    );
}

export default FetchData;