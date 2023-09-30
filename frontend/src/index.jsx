import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { CurrListContextProvider } from './context/CurrListContext.jsx';
import { AllListsContextProvider } from './context/AllListsContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <AllListsContextProvider>
      <CurrListContextProvider>
        <App />
      </CurrListContextProvider>
    </AllListsContextProvider>
  </AuthContextProvider>
);
