import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApiContextProvider } from "./context/ApiContext";
import { Dashboard } from "./pages/Dashboard";
import MyProfile from "./pages/MyProfile";
import MainMenu from "./pages/MainMenu";
import RegisterForm from "./pages/RegisterForm";
import "./styles/mainMenu";
import "./App.css";

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
                  <MainMenu />
                  <Dashboard />
                </ApiContextProvider>
              }
            />
            <Route path="/RegisterForm" element={<RegisterForm />} />
            <Route path="/MyProfile" element={<MyProfile />} />
          </>
        ) : (
          <>
            <Route path="/" element={<LoginPage />} />
            <Route path="/RegisterForm" element={<RegisterForm />} />
            <Route path="/MyProfile" element={<MyProfile />} />
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
