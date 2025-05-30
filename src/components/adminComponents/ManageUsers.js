import React, { useState, useEffect } from 'react';
import './ManageUsers.css';
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/admin/home');
    };
    
    const [users, setUsers] = useState([]);
    const [searchEmail, setSearchEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/admin/users');
            const data = await response.json();
            if (data.code === 200) {
                setUsers(data.data);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('获取用户列表失败');
        } finally {
            setLoading(false);
        }
    };

    const handleBan = async (userId, days) => {
        if (!days) return;
        try {
            const response = await fetch(`/api/admin/users/${userId}/ban`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ days: parseInt(days) })
            });
            const data = await response.json();
            if (data.code === 200) {
                setFeedback(`用户 ${userId} 已被封禁 ${days} 天`);
                fetchUsers(); // 刷新用户列表
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('封禁操作失败');
        }
    };

    const handleMute = async (userId, hours) => {
        if (!hours) return;
        try {
            const response = await fetch(`/api/admin/users/${userId}/mute`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ hours: parseInt(hours) })
            });
            const data = await response.json();
            if (data.code === 200) {
                setFeedback(`用户 ${userId} 已被禁言 ${hours} 小时`);
                fetchUsers(); // 刷新用户列表
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('禁言操作失败');
        }
    };

    return (
        <div className="manage-users">
            <button onClick={handleBackClick} className='backBtn'>
                返回
            </button>
            {error && <div className="error-message">{error}</div>}
            {feedback && <div className="success-message">{feedback}</div>}
            {loading && <div className="loading">加载中...</div>}
            
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="搜索邮箱..."
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                />
            </div>
            
            <div className="users-list">
                {users.map(user => (
                    <div key={user.id} className="user-item">
                        <div className="user-info">
                            <p>ID: {user.id}</p>
                            <p>邮箱: {user.email}</p>
                            <p>状态: {user.status}</p>
                            <p>注册时间: {new Date(user.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="user-actions">
                            <select 
                                onChange={(e) => handleBan(user.id, e.target.value)}
                                value=""
                            >
                                <option value="">封禁时长</option>
                                <option value="1">1天</option>
                                <option value="7">7天</option>
                                <option value="30">30天</option>
                                <option value="365">365天</option>
                            </select>
                            <select 
                                onChange={(e) => handleMute(user.id, e.target.value)}
                                value=""
                            >
                                <option value="">禁言时长</option>
                                <option value="1">1小时</option>
                                <option value="12">12小时</option>
                                <option value="24">24小时</option>
                                <option value="72">72小时</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageUsers;
