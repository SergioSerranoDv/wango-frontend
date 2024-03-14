import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApiContextProvider } from "./context/ApiContext";
import { Dahsboard } from "./pages/Dahsboard";
import MyProfile from "./pages/MyProfile";
import "./App.css";
import logo from "./logo.svg";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route
              path="/"
              element={
                <ApiContextProvider>
                  <Dahsboard />
                </ApiContextProvider>
              }
            ></Route>
            <Route path="/myProfile" element={<MyProfile />} />
          </>
        ) : (
          <>
            <Route path="/" element={<LoginPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();
  loginWithRedirect();
  return <div>Login</div>;
};

export default App;
