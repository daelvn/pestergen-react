import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Views
import Homestuck from "./views/Homestuck";

// TODO: route all other views
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homestuck />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
