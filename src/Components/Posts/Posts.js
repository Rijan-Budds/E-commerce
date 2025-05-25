import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Posts.css"; // Ensure this path is correct

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/posts")
      .then((response) => {
        if (response.data.status === "success") {
          setPosts(response.data.data);
        } else {
          console.error("Failed to fetch posts");
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          {post.photo && (
            <img
              src={`http://localhost:8081/uploads/${post.photo}`}
              alt="Post"
              className="post-image"
            />
          )}
          <div className="post-card-content">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-details">
              <strong>Category:</strong> {post.category} |{" "}
              <strong>Condition:</strong> {post.conditions}
            </p>

            <p className="post-details">
              <strong>Price:</strong> Rs. {post.price} (
              {post.negotiable ? "Negotiable" : "Fixed"})
            </p>
            <p className="post-description">{post.description}</p>
            <p className="post-meta">
              Posted just now · {post.location || "Unknown location"} · Seller
              Name
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;