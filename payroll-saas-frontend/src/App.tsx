import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Employees from "./pages/Employees";
import Payroll from "./pages/Payroll";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/payroll" element={<Payroll />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;