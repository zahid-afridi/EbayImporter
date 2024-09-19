import App from "./App";

import { createRoot } from "react-dom/client";
import { initI18n } from "./utils/i18nUtils";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/Store";
import { PersistGate } from 'redux-persist/integration/react';
import { PolarisProvider } from "./components";
import { BrowserRouter } from "react-router-dom";

// Ensure that locales are loaded before rendering the app
initI18n().then(() => {
  const root = createRoot(document.getElementById("app"));
  root.render(
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
      <PolarisProvider>
        
        <App />
      </PolarisProvider>
    </BrowserRouter>
    </PersistGate>
  </Provider>



);
});
