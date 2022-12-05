import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./page/header/Header";
import BlogPage from "./page/blogPage";
import BlogPublishPage from "./page/blogPublishPage";
import HomePage from "./page/homePage";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<BlogPage />} />
        <Route path="/blog-publish" element={<BlogPublishPage />} />
      </Routes>
    </>
  );
}

export default App;
