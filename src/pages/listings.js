import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./assets/config"; // Import your Firestore instance
import './assets/css/listings.css'

function Listings() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // Fetch posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "postListings"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(data);
      console.log(data); // This should display an array of posts
    };
  
    fetchPosts();
  }, []);
  

  return (
    <div>
      <a href="/postlisting" className="post-link">
        Go Post Something Fatty
      </a>

      <h1>Available Listings</h1>
      <div className="listings-container">
        {posts.map((post) => (
          <div key={post.id} className="listing-card">
            {post.pictureURL && (
              <img src={post.pictureURL} alt={post.itemName} className="item-image" />
            )}
            <h2>{post.itemName}</h2>
            <p>Wear: {post.itemWear}</p>
            <p>Location: {post.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Listings;
