import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/Navigation/ProtectedRoute";
import HomeA from "./pages/HomeA";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";
import Profile from "./pages/users/Profile";
import AddIncome from "./pages/income/AddIncome";
import AddExpense from "./pages/expense/AddExpense";
import NotAdmin from "./components/NotAdmin";
import DashboardData from "./pages/users/DashboardData";
// import Navbar from "./components/Navigation/Navbar";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeA />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DashboardData />} />
          <Route path="/not-found" element={<NotAdmin />} />
          <Route path="/*" element={<ProtectedRoute />}>
            <Route path="profile" element={<Profile />} />
            <Route path="add-income" element={<AddIncome />} />
            <Route path="add-expense" element={<AddExpense />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
