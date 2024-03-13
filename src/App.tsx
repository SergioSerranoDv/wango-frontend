import React from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import RegisterForm from "./components/RegisterForm";
const Title = styled.h1``;
function App() {
  return (
    <div>
      <RegisterForm />
    </div>
  );
}

export default App;
