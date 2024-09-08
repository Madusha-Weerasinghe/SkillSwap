import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/welcomePage/welcomePage";
import Community from "./pages/community/community";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/community/:id" element={<Community />} />
      </Routes>
    </Router>
  );
}

export default App;
