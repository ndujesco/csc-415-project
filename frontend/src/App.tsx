import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Dashboard from "./pages/dashboard/Index";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import "./styles/index.scss";
import Orders from "./pages/dashboard/Orders";
import Inventory from "./pages/dashboard/Inventory";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    {/* Main Layout Routes */}
                    <Route path="/" element={<Navigate to='/dashboard' />} />

                    {/* Dashboard Layout Routes */}
                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="inventory" element={<Inventory />} />
                    </Route>

                    <Route path="/login" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />

                    {/* 404 Page */}
                    {/* <Route path="*" element={<NotFound />} /> */}
                </Routes>
            </Router>
        </>
    );
}

export default App;
