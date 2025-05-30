import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Register from "./components/userComponents/Register";
import Login from "./components/userComponents/Login";
import Home from "./components/userComponents/Home";
import PostDetail from "./components/userComponents/PostDetail";
import Profile from "./components/userComponents/Profile";
import Rules from "./components/userComponents/Rules";
import Payment from "./components/userComponents/Payment";
import EntryTest from "./components/userComponents/EntryTest";
import Waitlist from "./components/userComponents/Waitlist";
import ManagePassword from "./components/userComponents/ManagePassword";
import AnswerRecordsCheck from "./components/userComponents/AnswerRecordsCheck";

const UserApp = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {/* 认证相关路由 */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    {/* 主要功能路由 */}
                    <Route path="/home" element={<Home />} />
                    <Route path="/posts/:id" element={<PostDetail />} />
                    <Route path="/profile" element={<Profile />} />

                    
                    {/* Profile 相关子路由 */}
                    <Route path="/profile/manage-password" element={<ManagePassword />} />
                    <Route path="/profile/payment" element={<Payment />} />
                    <Route path="/profile/answer-records" element={<AnswerRecordsCheck />} />
                    <Route path="/profile/rules" element={<Rules />} />


                    {/* 答题测试页面 */}
                    <Route path="/entry-test" element={<EntryTest />} />

                    {/* 等待审核页面 */}
                    <Route path="/waitlist" element={<Waitlist />} />
                    
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default UserApp;

//后端是admin和user共用一个程序，那么前端要怎么架构呢？需要看视频才能知道到底该写成两个App还是一个App
