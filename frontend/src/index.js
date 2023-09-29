import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthContextProvider } from './context/AuthContext.js';
import { CurrListContextProvider } from './context/CurrListContext.js';
import { AllListsContextProvider } from './context/AllListsContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <AllListsContextProvider>
        <CurrListContextProvider>
          <App />
        </CurrListContextProvider>
      </AllListsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
