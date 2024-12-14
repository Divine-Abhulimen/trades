import React, { useState } from "react";
import { auth } from "./assets/config"; // Import Firebase authentication
import "./assets/css/signup.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  let navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent form submission refresh
    try {
      // Create user with email and password
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      // Optional: Set display name for the user
      await userCredential.user.updateProfile({
        displayName: fullName,
      });

      console.log("User created:", userCredential.user);
      navigate('/');
      setError(""); // Clear any previous errors
      alert("Sign-up successful!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="form-container">
      <form id="signup-form" onSubmit={handleSignUp}>
        <input
          name="Email"
          type="email"
          className="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          name="Fullname"
          type="text"
          className="fullName"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          name="Password"
          type="password"
          className="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>} {/* Show errors */}
    </div>
  );
}

export default Signup;
