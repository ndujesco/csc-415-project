import { Navigate, Route, BrowserRouter as Router, Routes, Outlet } from "react-router-dom";
import "./App.css";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Dashboard from "./pages/dashboard/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import "./styles/index.scss";
import Orders from "./pages/dashboard/Orders";
import Inventory from "./pages/dashboard/Inventory";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {tokenManager} from "./lib/utils"; // Import your tokenManager

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: false,
            retry: 0,
            staleTime: 60 * 1000,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        },
        mutations: {
            retry: 0,
        },
    },
});

// Protected route component
function ProtectedRoute() {
    return tokenManager.getToken() ? <Outlet /> : <Navigate to="/login" replace />;
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster />
            <Router>
                <Routes>
                    {/* Redirect to dashboard */}
                    <Route path="/" element={<Navigate to="/dashboard" />} />

                    {/* Protected Dashboard Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<DashboardLayout />}>
                            <Route index element={<Dashboard />} />
                            <Route path="orders" element={<Orders />} />
                            <Route path="inventory" element={<Inventory />} />
                        </Route>
                    </Route>

                    {/* Auth Routes */}
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />

                    {/* 404 Page */}
                    {/* <Route path="*" element={<NotFound />} /> */}
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
