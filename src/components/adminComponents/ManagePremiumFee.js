import React, { useState, useEffect } from 'react';
import './ManagePremiumFee.css';
import { useNavigate } from "react-router-dom";

const ManagePremiumFee = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/admin/home');
    };
    
    const [currentFee, setCurrentFee] = useState(0);
    const [newFee, setNewFee] = useState('');

    useEffect(() => {
        fetchCurrentFee();
    }, []);

    const fetchCurrentFee = async () => {
        try {
            const response = await fetch('/api/admin/premium/current-fee');
            const data = await response.json();
            if (data.code === 0) {
                setCurrentFee(data.data.amount);
            }
        } catch (error) {
            console.error('获取当前会员费失败:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newFee || isNaN(newFee) || newFee <= 0) {
            alert('请输入有效的金额');
            return;
        }
        try {
            const response = await fetch('/api/admin/premium/next-month-fee', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: parseFloat(newFee) })
            });
            const data = await response.json();
            if (data.code === 0) {
                alert('修改成功');
                setNewFee('');
                fetchCurrentFee();
            }
        } catch (error) {
            alert('修改失败，请重试');
        }
    };

    return (
        <div className="manage-premium-fee">
            <button onClick={handleBackClick} className='backBtn'>
                返回
            </button>
            <h2>会员费用管理</h2>
            <div className="current-fee">
                <p>当前会员费: ¥{currentFee}/月</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="fee-input">
                    <label>下月会员费:</label>
                    <input
                        type="number"
                        step="0.01"
                        value={newFee}
                        onChange={(e) => setNewFee(e.target.value)}
                        placeholder="请输入新的会员费"
                    />
                </div>
                <button type="submit">确认修改</button>
            </form>
        </div>
    );
};

export default ManagePremiumFee;

