import React from "react";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Gallery from "./components/Gallery";
import ArtworkDetail from "./components/ArtworkDetail";
import Scanner from "./components/Scanner";
import ARViewer from "./components/ARViewer";
import Tours from "./components/Tours";
import TourDetail from "./components/TourDetail";
import Favorites from "./components/Favorites";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery/:category" element={<Gallery />} />
          <Route path="/artwork/:id" element={<ArtworkDetail />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/ar" element={<ARViewer />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tour/:tourId" element={<TourDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </HashRouter>
      <Toaster />
    </div>
  );
}

export default App;