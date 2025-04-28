import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/api/posts')
            .then(response => {
                if (response.data.status === "success") {
                    setPosts(response.data.data);
                } else {
                    console.error("Failed to fetch posts");
                }
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
            });
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                {posts.map(post => (
                    <div key={post.id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
                        <h2>{post.title}</h2>
                        <p>Category: {post.category}</p>
                        <p>Condition: {post.conditions}</p>
                        <p>Description: {post.description}</p>
                        <p>Price: {post.price}</p>
                        <p>Negotiable: {post.negotiable ? 'Yes' : 'No'}</p>
                        {post.photo && <img src={`http://localhost:8081/uploads/${post.photo}`} alt="Post" width="200" />}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Posts;
