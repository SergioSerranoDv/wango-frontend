import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApiContextProvider } from "./context/ApiContext";
import { Dashboard } from "./pages/Dashboard";
import MyProfile from "./pages/MyProfile";
import MainMenu from "./components/mainMenu";
import "./styles/components/mainMenu";
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
                  <Dashboard />
                  <MyProfile />
                </ApiContextProvider>
              }
            />
            <Route path="/myProfile" element={<MyProfile />} />
          </>
        ) : (
          <>
            <Route path="/" element={<LoginPage />} />
            <Route path="/" element={<MainMenu />} />
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
