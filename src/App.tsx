import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/Landing/page.tsx";
import Login from "./pages/Login/Login.tsx";
import SignUp from "./pages/SignUp/SignUp.tsx";
import ResetPassword from "./pages/ResetPassword/ResetPassword.tsx";
import ChangePassword from "./pages/ChangePassword/ChangePassword.tsx";

function Dashboard() {
    return null;
}

const App: React.FC = () => {
    return (
        <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<LandingPage/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signUp" element={<SignUp/>}/>
                        <Route path="/resetPassword" element={<ResetPassword/>}/>
                        <Route path="/changePassword" element={<ChangePassword/>}/>
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard/>
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </Router>
        </AuthProvider>
    );
};

export default App;
