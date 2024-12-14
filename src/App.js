import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Signup from "./pages/signup";
import Listings from "./pages/listings";
import Postlistings from "./pages/postlisting";
import Signin from './pages/signin';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Listings />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/postlisting" element={ <Postlistings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
