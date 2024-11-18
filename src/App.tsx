import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { LoadingAnimation } from "./components/Loading";
import { ApiContextProvider } from "./context/ApiContext";
import { AppContextProvider } from "./context/AppContext";
import { CollectionRecords } from "./pages/CollectionRecords";
import { Collections } from "./pages/Collections";
import { Crops } from "./pages/Crops";
import { Dashboard } from "./pages/Dashboard";
import { IA } from "./pages/IA";
import { Lots } from "./pages/Lots";
import { Products } from "./pages/Products";
import { SignUp } from "./pages/SignUp";
import { Profile } from "./pages/UserProfile";
import VarForm from "./pages/VarForm";
import { WF } from "./pages/WF";
import { WFComponents } from "./pages/WFComponents";
import { WFFull } from "./pages/WFFull";
import { WaterFootPrint } from "./pages/WaterFootprint";
import "./styles/MainMenuStyles";

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
                  <Route path="/dashboard/collections/:id" element={<Collections />} />
                  <Route
                    path="/dashboard/collections/records/:id"
                    element={<CollectionRecords />}
                  />
                  <Route path="/dashboard/crops/:id" element={<Crops />} />
                  <Route path="/dashboard/lots" element={<Lots />} />
                  <Route path="/dashboard/products" element={<Products />} />
                  <Route path="/dashboard/water-footprint" element={<WaterFootPrint />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/register-form" element={<SignUp />} />
                  <Route path="/config-vars" element={<VarForm />} />
                  <Route
                    path="/dashboard/water-footprint/components/:id"
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
