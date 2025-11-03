// import { StrictMode } from 'react';
import React from "react";
import { Toaster } from "react-hot-toast";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          whiteSpace: "nowrap",
          background: "rgba(255, 255, 255, 0.15)", // transparent glass base
          color: "#000",
          backdropFilter: "blur(12px) saturate(180%)", // main blur effect
          WebkitBackdropFilter: "blur(12px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          borderRadius: "16px",
          padding: "12px 20px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
          fontWeight: 500,
          letterSpacing: "0.3px",
          transition: "all 0.3s ease-in-out",
          minWidth: "300px",
          maxWidth: "520px",
          textAlign: "center",
        },
      }}
    />
  </React.StrictMode>,
)
