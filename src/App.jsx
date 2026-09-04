import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import ChainLinkCalculator from "./pages/ChainLinkCalculator";

function App() {
  return (
    <BrowserRouter>
      <div className="font-sans text-gray-800 selection:bg-blue-200">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator/chain-link" element={<ChainLinkCalculator />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;