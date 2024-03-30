import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import { ApiContextProvider } from "./context/ApiContext";
import MyProfile from "./pages/MyProfile";
import DashboardLotes from "./pages/DashboardLotes";
import { Dashboard } from "./pages/Dashboard";
import RegisterForm from "./pages/RegisterForm";
import BatchManage from "./pages/BatchManage";
import LoteForm from "./pages/AddLote";
import "./styles/MainMenuStyles";
import "./App.css";
import NewCrop from "./pages/NewCrop";
import Loading from "./components/Loading";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <Loading />;
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
                  <AppContextProvider>
                    <Dashboard />
                  </AppContextProvider>
                </ApiContextProvider>
              }
            ></Route>
            <Route path="/myProfile" element={<MyProfile />} />
            <Route path="/addLote" element={<LoteForm />} />
            <Route path="/loteMenu" element={<DashboardLotes />} />
            <Route path="/RegisterForm" element={<RegisterForm />} />
            <Route path="/MyProfile" element={<MyProfile />} />
            <Route path="/BatchManage" element={<BatchManage />} />
            <Route path="/NewCrop" element={<NewCrop />} />
          </>
        ) : (
          <>
            <Route path="/" element={<LoginPage />} />
            <Route path="/RegisterForm" element={<RegisterForm />} />

            <Route path="/MyProfile" element={<MyProfile />} />
            <Route path="/Loading" element={<Loading />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();
  loginWithRedirect();
  return (
    <div>
      <Loading />
    </div>
  );
};

export default App;
