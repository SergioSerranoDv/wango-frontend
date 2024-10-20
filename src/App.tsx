import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import { ApiContextProvider } from "./context/ApiContext";
import { LoadingAnimation } from "./components/Loading";
import { Profile } from "./pages/UserProfile";
import { Dashboard } from "./pages/Dashboard";
import RegisterForm from "./pages/RegisterForm";
import { Lots } from "./pages/Lots";
import VarForm from "./pages/VarForm";
import { Crops } from "./pages/Crops";
import { RegisterView } from "./pages/RegisterView";
import { WFComponents } from "./pages/WFComponents";
import { WFCrops } from "./pages/WFCrops";
import { WFLot } from "./pages/WFLot";
import "./App.css";
import "./styles/MainMenuStyles";
import { WF } from "./pages/WF";
import { IA } from "./pages/IA";
import { WFFull } from "./pages/WFFull";
import { WaterFootPrint } from "./pages/WaterFootprint";

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
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/register-form" element={<RegisterForm />} />
                  <Route path="/dashboard/lots" element={<Lots />} />
                  <Route path="/dashboard/crops/:id" element={<Crops />} />
                  <Route path="/config-vars" element={<VarForm />} />
                  <Route path="/dashboard/water-footprint" element={<WaterFootPrint />} />
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
