import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApiContextProvider } from "./context/ApiContext";
import MyProfile from "./pages/MyProfile";
import MainMenu from "./pages/MainMenu";
import RegisterForm from "./pages/RegisterForm";
import BatchManage from "./pages/BatchManage";
import "./styles/MainMenu";
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
            <Route path="/BatchManage" element={<BatchManage />} />
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
