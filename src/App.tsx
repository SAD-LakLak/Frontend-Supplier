import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/Landing/page.tsx";
import Login from "./pages/Login/Login.tsx";
import SignUp from "./pages/SignUp/SignUp.tsx";
import ResetPassword from "./pages/ResetPassword/ResetPassword.tsx";
import ChangePassword from "./pages/ChangePassword/ChangePassword.tsx";
import Dashboard from "./pages/Dashboard/Dashboad.tsx";
import Products from "./pages/Products/Products.tsx";
import CreateProduct from "./pages/Products/CreateProduct/CreateProduct.tsx";
import EditProduct from "./pages/Products/Edit/id/Edit.tsx";
import SingleProduct from "./pages/Products/id/SingleProduct.tsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
                        <Route path="/products" element={
                        <ProtectedRoute>
                            <Products/>
                        </ProtectedRoute>
                        }/>
                        <Route path="/products/:id" element={
                            <ProtectedRoute>
                                <SingleProduct/>
                            </ProtectedRoute>
                        }/>
                        <Route
                            path="/products/createProduct"
                            element={
                                <ProtectedRoute>
                                    <CreateProduct/>
                                 </ProtectedRoute>
                            }
                        />
                        <Route 
                            path="/products/edit/:id" 
                            element={
                                <ProtectedRoute>
                                    <EditProduct/>
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </Router>
        </AuthProvider>
    );
};

export default App;
