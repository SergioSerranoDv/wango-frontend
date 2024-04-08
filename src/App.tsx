import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import { ApiContextProvider } from "./context/ApiContext";
import MyProfile from "./pages/MyProfile";
import DashboardLotes from "./pages/DashboardLotes";
import { Dashboard } from "./pages/Dashboard";
import RegisterForm from "./pages/RegisterForm";
import LotsManage from "./pages/LotsManage";
import LoteForm from "./pages/AddLote";
import LoteFormEdit from "./pages/EditLote";
import "./styles/MainMenuStyles";
import "./App.css";
import NewCrop from "./pages/NewCrop";
import Loading from "./components/Loading";
import LotsCrops from "./pages/LotsCrops";

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
            <Route
              path="/my-profile"
              element={
                <ApiContextProvider>
                  <AppContextProvider>
                    <MyProfile />
                  </AppContextProvider>
                </ApiContextProvider>
              }
            ></Route>
            <Route
              path="/register-form"
              element={
                <ApiContextProvider>
                  <AppContextProvider>
                    <RegisterForm />{" "}
                  </AppContextProvider>
                </ApiContextProvider>
              }
            />
            <Route path="/lote-menu" element={<DashboardLotes />} />
            <Route
              path="/add-lote"
              element={
                <ApiContextProvider>
                  <AppContextProvider>
                    <LoteForm />
                  </AppContextProvider>
                </ApiContextProvider>
              }
            />
            <Route
              path="/edit-lote/:id"
              element={
                <ApiContextProvider>
                  <AppContextProvider>
                    <LoteFormEdit />
                  </AppContextProvider>
                </ApiContextProvider>
              }
            />
            <Route path="/new-crop" element={<NewCrop />} />
            <Route
              path="/lots-manage"
              element={
                <ApiContextProvider>
                  <AppContextProvider>
                    <LotsManage />
                  </AppContextProvider>
                </ApiContextProvider>
              }
            />
          </>
        ) : (
          <>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register-form" element={<RegisterForm />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/lots-crops" element={<LotsCrops />} />
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
