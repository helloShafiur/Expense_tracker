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
import AdminRoute from "./components/Navigation/AdminRoute";
import ExpensesList from "./pages/expense/ExpensesList";
import EditExpense from "./pages/expense/EditExpense";
// import Navbar from "./components/Navigation/Navbar";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeA />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<AdminRoute />}>
            <Route path="dashboard" element={<DashboardData />} />
          </Route>
          <Route path="/not-found" element={<NotAdmin />} />
          <Route path="/*" element={<ProtectedRoute />}>
            <Route path="profile" element={<Profile />} />
            <Route path="expenses" element={<ExpensesList />} />
            <Route path="edit-expense" element={<EditExpense />} />
            <Route path="add-income" element={<AddIncome />} />
            <Route path="add-expense" element={<AddExpense />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
