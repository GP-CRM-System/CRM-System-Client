import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Login, Register, Dashboard } from "./pages";
import {ProtectedRoute, PublicRoute} from "./components";

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                        <Login />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/"
                    element={
                        <PublicRoute>
                        <Register />
                        </PublicRoute>
                    }
                />

                {/* Protected routes */}
                <Route
                    path="/dashboard/*"
                    element={
                        <ProtectedRoute>
                        <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
