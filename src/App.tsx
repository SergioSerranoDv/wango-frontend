import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/components/mainMenu";
import MainMenu from "./components/mainMenu";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
      </Routes>
    </Router>
  );
}

export default App;
