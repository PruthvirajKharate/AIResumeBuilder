import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import Login from "./pages/Login";

import "./App.css";

import Preview from "./pages/Preview";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />}></Route>
          <Route path="builder/:resumeId" element={<ResumeBuilder />}></Route>
        </Route>
        <Route path="view/:resumeId" element={<Preview />}></Route>
        <Route path="login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
