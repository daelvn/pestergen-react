import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Views
import Homestuck from "./views/Homestuck";
import Create from "./views/Create";
import NotFound from "./views/NotFound";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Homestuck id={"home"} />} />
      <Route path="/view/:id" element={<Homestuck />} />
      <Route path="/create" element={<Create />} />
      <Route path="/404" element={<NotFound />} />
    </Routes>
  );
}

// TODO: route all other views
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </React.StrictMode>
);
