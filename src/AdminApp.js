import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";


import AdminLogin from "./components/adminComponents/AdminLogin";
import AdminHome from "./components/adminComponents/AdminHome";
import ManageUsers from "./components/adminComponents/ManageUsers";
import ManageCategories from "./components/adminComponents/ManageCategories";
import ManageReports from "./components/adminComponents/ManageReports";
import ManagePremiumFee from "./components/adminComponents/ManagePremiumFee";
import ReviewAnswers from "./components/adminComponents/ReviewAnswers";
import UserAnswerDetail from "./components/adminComponents/UserAnswerDetail";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>

                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/home" element={<AdminHome />} />
                    <Route path="/admin/users" element={<ManageUsers />} />
                    <Route path="/admin/categories" element={<ManageCategories />} />
                    <Route path="/admin/reports" element={<ManageReports />} />
                    <Route path="/admin/premium-fee" element={<ManagePremiumFee />} />
                    <Route path="/admin/review-answers" element={<ReviewAnswers />} />
                    <Route path="/admin/review-answers/:userId" element={<UserAnswerDetail />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
