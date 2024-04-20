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
import VarForm from "./pages/VarForm";
import LotsCrops from "./pages/LotsCrops";
import RegisterView from "./pages/RegisterView";
// Testing the new workflow
function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <ApiContextProvider>
        <AppContextProvider>
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
                  <Route path="/lot-menu/crops/:id" element={<LotsCrops />} />
                  <Route path="/lot-menu/register-view" element={<RegisterView />} />
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
        </AppContextProvider>
      </ApiContextProvider>
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
