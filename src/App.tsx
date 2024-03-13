import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApiContextProvider } from "./context/ApiContext";
import logo from "./logo.svg";
import "./App.css";
import MyProfile from "./pages/MyProfile";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          {isAuthenticated ? (
            <Route
              path="/"
              element={
                <>
                  <ApiContextProvider>
                    <div className="App">
                      <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <p>
                          Edit <code>src/App.tsx</code> and save to reload.
                        </p>
                        <a
                          className="App-link"
                          href="https://reactjs.org"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Learn React
                        </a>
                      </header>
                    </div>
                  </ApiContextProvider>
                </>
              }
            />
          ) : (
            <>
              <Route path="/" element={<LoginPage />} />
              <Route path="/myProfile" element={<MyProfile />} />
            </>
          )}
        </Route>
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
