import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// Import Views
import Homestuck from "./views/Homestuck";
import Create from "./views/Create";
import NotFound from "./views/NotFound";
import PageList from "./views/PageList";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Homestuck overrideId={"home"} />} />
      <Route path="/view/:id" element={<Homestuck />} />
      <Route path="/create" element={<Create />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="/list" element={<PageList />} />
    </Routes>
  );
}

// TODO: route all other views
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
