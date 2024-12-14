import React, { useState } from "react";
import { uploadPicture } from "../utils/storageUtils"; // Utility function for picture upload
import { db } from "./assets/config"; // Firebase Firestore instance
import { addDoc, collection } from "firebase/firestore"; // Firestore methods
import "./assets/css/signup.css";

function PostListing() {
  const [itemName, setItemName] = useState("");
  const [itemWear, setItemWear] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState(null); // To store the selected file
  const [isUploading, setIsUploading] = useState(false); // Upload state

  const handlePost = async (e) => {
    e.preventDefault();
    if (!itemName || !itemWear || !location) {
      alert("Please fill in all fields.");
      return;
    }
    if (!file) {
      alert("Please select a picture to upload.");
      return;
    }

    setIsUploading(true);
    try {
      // Upload the picture and get the download URL
      const pictureURL = await uploadPicture(file, "listings");

      // Save post details to Firestore
      const postCollectionRef = collection(db, "postListings");
      await addDoc(postCollectionRef, {
        itemName,
        itemWear,
        location,
        pictureURL, // Save the picture URL with the post
        createdAt: new Date(),
      });

      alert("Post created successfully!");
      setItemName("");
      setItemWear("");
      setLocation("");
      setFile(null);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create the post. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="form-container">
      <form id="post-listing-form" onSubmit={handlePost}>
        <input
          name="Item Name"
          type="text"
          className="item-name"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
        <input
          name="Wear"
          type="text"
          className="item-wear"
          placeholder="How worn is the item?"
          value={itemWear}
          onChange={(e) => setItemWear(e.target.value)}
          required
        />
        <input
          name="Location"
          type="text"
          className="item-location"
          placeholder="Item Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default PostListing;
