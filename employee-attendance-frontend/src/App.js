import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UsersPage from "./pages/UsersPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import AttendancePage from "./pages/AttendancePage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />


        <Route path="/users" element={<ProtectedRoute allowedRoles={['admin', 'manager']}><UsersPage /></ProtectedRoute>} />


        <Route path="/users" element={
          <ProtectedRoute role="manager"><UsersPage /></ProtectedRoute>
        }/>

        <Route path="/departments" element={
          <ProtectedRoute role="manager"><DepartmentsPage /></ProtectedRoute>
        }/>

        <Route path="/attendances" element={
          <ProtectedRoute><AttendancePage /></ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
