import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Analytics from "./pages/Analytics";
import AIAdvisor from "./pages/AIAdvisor";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/ai" element={<AIAdvisor />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;