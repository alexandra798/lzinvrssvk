import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminHome.css';

const AdminHome = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="admin-home">
            <h1>管理员控制台</h1>
            <div className="admin-buttons">
                <button onClick={() => handleNavigation('/admin/premium-fee')}>
                    修改下个月的会员费
                </button>
                <button onClick={() => handleNavigation('/admin/review-answers')}>
                    批改作答
                </button>
                <button onClick={() => handleNavigation('/admin/users')}>
                    管理用户
                </button>
                <button onClick={() => handleNavigation('/admin/reports')}>
                    处理被举报内容
                </button>
                <button onClick={() => handleNavigation('/admin/categories')}>
                    修改分区
                </button>
            </div>
        </div>
    );
};

export default AdminHome;
