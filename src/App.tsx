import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import all page components
import Index from "./pages/Index";
import Shamatha from "./pages/Shamatha";
import Practice from "./pages/Practice";
import Path from "./pages/Path";
import WhatHappens from "./pages/WhatHappens";
import Assessment from "./pages/Assessment";
import Stage from "./pages/Stage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/shamatha" element={<Shamatha />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/path" element={<Path />} />
        <Route path="/whathappens" element={<WhatHappens />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/stage/:id" element={<Stage />} />
      </Routes>
    </Router>
  );
}

export default App;