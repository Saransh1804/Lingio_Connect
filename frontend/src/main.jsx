import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "react-query";
import * as apiClient from "./apiClient.js";
import { useMutation, useQueryClient } from "react-query";
import { SearchContextProvider } from "./context/SearchContext.jsx";
import { AppContextProvider } from "./context/AppContext.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
  <AppContextProvider>
    <SearchContextProvider>
      <Auth0Provider
        domain="dev-rzg0uho30sdg4ypr.us.auth0.com"
        clientId="cp2Ftkv3iYymRtxkmRgpc4DHYNsXZ9nd"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App />
      </Auth0Provider>
    </SearchContextProvider>
    </AppContextProvider>
  </QueryClientProvider>
);
