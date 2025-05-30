import React, { useState, useEffect } from 'react';
import './ReviewAnswers.css';
import UserAnswer from '../UserAnswer';
import { useNavigate } from "react-router-dom";


const ReviewAnswers = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/admin/home');
    };

    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState('pending'); // pending or activated

    useEffect(() => {
        fetchUsers();
    }, [activeTab]);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`/api/admin/users/answers?status=${activeTab}`);
            const data = await response.json();
            setUsers(data.data);
        } catch (error) {
            console.error('获取用户答题记录失败:', error);
        }
    };

    return (
        <div className="review-answers">
            <button onClick={handleBackClick} className='backBtn'>
                返回
            </button>
            <div className="tab-buttons">
                <button 
                    className={activeTab === 'pending' ? 'active' : ''}
                    onClick={() => setActiveTab('pending')}>
                    待激活用户
                </button>
                <button 
                    className={activeTab === 'activated' ? 'active' : ''}
                    onClick={() => setActiveTab('activated')}>
                    已激活用户
                </button>
            </div>
            
            <div className="users-list">
                {users.map(user => (
                    <UserAnswer key={user.id} user={user} status={activeTab} />
                ))}
            </div>
        </div>
    );
};

export default ReviewAnswers;
