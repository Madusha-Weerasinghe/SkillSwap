import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/welcomePage/welcomePage";
import Community from "./pages/community/community";
import Chat from "./pages/message/message";
import AfterWelcome from "./pages/mainPage/mainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/main" element={<AfterWelcome />}>
          <Route path="community/:id" element={<Community />} />
          <Route path="chat/:id" element={<Chat />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
