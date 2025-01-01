import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ActionsUseTransition from './views/ActionsUseTransition';
import ActionsUseActionState from './views/ActionsUseActionState';
import ActionsUseOptimistic from './views/ActionsUseOptimistic'
import UseHook from './views/UseHook';
import { BrowserRouter, Routes, Route  } from "react-router";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ActionsUseTransition" element={<ActionsUseTransition />} />
        <Route path="/ActionsUseActionState" element={<ActionsUseActionState />} />
        <Route path="/ActionsUseOptimistic" element={<ActionsUseOptimistic />} />
        <Route path="/UseHook" element={<UseHook />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

