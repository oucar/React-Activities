import ReactDOM from "react-dom/client";
import App from "./app/layout/App.tsx";
import "semantic-ui-css/semantic.min.css";
import React from "react";
import { StoreContext, store } from "./app/stores/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
    // Setting up MobX
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
);
