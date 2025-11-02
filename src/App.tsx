// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Home from "./pages/Home";
import SupportAI from "./pages/SupportAI";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app/*" element={<SupportAI />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
