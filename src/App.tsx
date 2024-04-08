import React, { useContext } from "react";
import { ApiContext } from "./context/ApiContext";
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
import VarForm from "./pages/VarForm";
import LotsCrops from "./pages/LotsCrops";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  const { serviceIsReady } = useContext(ApiContext);

  if (isLoading) {
    return <Loading />;
  }
  console.log(serviceIsReady);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/my-profile" element={<MyProfile />} />
              <Route path="/register-form" element={<RegisterForm />} />
              <Route path="/lot-menu/:id" element={<DashboardLotes />} />
              <Route path="/add-lote" element={<LoteForm />} />
              <Route path="/edit-lote/:id" element={<LoteFormEdit />} />
              <Route path="/lot-menu/new-crop/:id" element={<NewCrop />} />
              <Route path="/lots-manage" element={<LotsManage />} />
              <Route path="/config-vars" element={<VarForm />} />
              <Route path="/lots-crops" element={<LotsCrops />} />
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
    </>
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
