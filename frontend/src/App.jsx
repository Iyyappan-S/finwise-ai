import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddIncome from "./pages/AddIncome";
import AddExpense from "./pages/AddExpense";
import Analytics from "./pages/Analytics";
import Budget from "./pages/Budget";
import RecurringTransactions from "./pages/RecurringTransactions";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Goals from "./pages/Goals";
import Reports from "./pages/Reports";
import AdminDashboard from "./pages/AdminDashboard";

import MainLayout from "./layouts/MainLayout";


function App(){

return(

<BrowserRouter>

<Routes>


{/* Public Routes */}

<Route 
path="/login" 
element={<Login/>}
/>


<Route 
path="/register" 
element={<Register/>}
/>



{/* Main Application Layout */}

<Route element={<MainLayout />}>


<Route 
path="/dashboard" 
element={<Dashboard/>}
/>


<Route 
path="/add-income" 
element={<AddIncome/>}
/>


<Route 
path="/add-expense" 
element={<AddExpense/>}
/>


<Route 
path="/analytics" 
element={<Analytics/>}
/>


<Route 
path="/budget" 
element={<Budget/>}
/>


<Route 
path="/profile" 
element={<Profile/>}
/>


<Route 
path="/settings" 
element={<Settings/>}
/>


<Route 
path="/notifications" 
element={<Notifications/>}
/>


<Route 
path="/goals" 
element={<Goals/>}
/>


<Route 
path="/reports" 
element={<Reports/>}
/>


<Route 
path="/admin/dashboard" 
element={<AdminDashboard/>}
/>


</Route>


</Routes>

</BrowserRouter>

)

}


export default App;