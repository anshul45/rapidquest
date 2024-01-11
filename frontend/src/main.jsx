import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import Home from "./page/Home.jsx";
import UploadVideo from "./page/UploadVideo.jsx";
import Header from "./components/Header.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadVideo />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
