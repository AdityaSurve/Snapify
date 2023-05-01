import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChatcontextProvider } from './context/notes/Chatcontext';
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChatcontextProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ChatcontextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
