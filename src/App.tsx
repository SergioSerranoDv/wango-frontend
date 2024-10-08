import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import { ApiContextProvider } from "./context/ApiContext";
import { LoadingAnimation } from "./components/Loading";
import { AddLot } from "./pages/AddLot";
import { Profile } from "./pages/UserProfile";
import { DashboardLots } from "./pages/DashboardLots";
import { Dashboard } from "./pages/Dashboard";
import RegisterForm from "./pages/RegisterForm";
import { LotsManage } from "./pages/LotsManage";
import { EditLot } from "./pages/EditLot";
import NewCrop from "./pages/NewCrop";
import VarForm from "./pages/VarForm";
import { LotsCrops } from "./pages/LotsCrops";
import { EditCrop } from "./pages/EditCrop";
import { RegisterView } from "./pages/RegisterView";
import { WFComponents } from "./pages/WFComponents";
import { WFCrops } from "./pages/WFCrops";
import { WFLot } from "./pages/WFLot";
import "./App.css";
import "./styles/MainMenuStyles";
import { WF } from "./pages/WF";
import { IA } from "./pages/IA";
import { WFFull } from "./pages/WFFull";

export const App: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingAnimation />;
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
                  <Route path="/my-profile" element={<Profile />} />
                  <Route path="/register-form" element={<RegisterForm />} />
                  <Route path="/lot-menu/:id" element={<DashboardLots />} />
                  <Route path="/add-lote" element={<AddLot />} />
                  <Route path="/edit-lote/:id" element={<EditLot />} />
                  <Route path="/lot-menu/new-crop/:id" element={<NewCrop />} />
                  <Route path="/lots-manage" element={<LotsManage />} />
                  <Route path="/config-vars" element={<VarForm />} />
                  <Route path="/lot-menu/crops/:id" element={<LotsCrops />} />
                  <Route path="/edit-crop/:id" element={<EditCrop />} />
                  <Route path="/lot-menu/edit-crop/register-view/:id" element={<RegisterView />} />
                  <Route path="/lot-menu/water-footprint/:id" element={<WFLot />} />
                  <Route path="/lot-menu/water-footprint/crops/:id" element={<WFCrops />} />
                  <Route
                    path="/lot-menu/water-footprint/crops/comp/:id"
                    element={<WFComponents />}
                  />
                  <Route
                    path="/lot-menu/water-footprint/crops/comp/:id/type/:type"
                    element={<WF />}
                  />
                  <Route
                    path="/lot-menu/water-footprint/crops/comp/:id/full"
                    element={<WFFull />}
                  />
                  <Route path="/lot-menu/water-footprint/crops/comp/:id/IA" element={<IA />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<LoginPage />} />
                  {/* <Route path="/Loading" element={<LoadingAnimation />} /> */}
                </>
              )}
            </Routes>
          </BrowserRouter>
        </AppContextProvider>
      </ApiContextProvider>
    </>
  );
};

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();
  loginWithRedirect();
  return <LoadingAnimation />;
};
