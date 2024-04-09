import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import ReactDOM from "react-dom/client";
import { ApiContextProvider } from "./context/ApiContext";
import { AppContextProvider } from "./context/AppContext";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Auth0Provider
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID as string}
    domain={process.env.REACT_APP_AUTH0_DOMAIN as string}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      scope: "read:current_user, update:current_user_metadata",
    }}
  >
    <React.StrictMode>
      <ApiContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </ApiContextProvider>
    </React.StrictMode>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
