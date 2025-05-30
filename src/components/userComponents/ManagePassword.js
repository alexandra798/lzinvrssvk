import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManagePassword.css';

//这是一个页面，需要route，需要useEffect
const ManagePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('两次输入的新密码不一致');
            return;
        }

        try {
            const response = await fetch('/profile/manage-password', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    oldPassword,
                    newPassword
                })
            });
            const data = await response.json();
            if (data.code === 0) {
                alert('密码修改成功');
                navigate('/profile');
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('修改失败，请重试');
        }
    };

    return (
        <div className="manage-password">
            <h2>修改密码</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="原密码"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="新密码"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="确认新密码"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">确认修改</button>
            </form>
        </div>
    );
};

export default ManagePassword;

