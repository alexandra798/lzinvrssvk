import React, { useState, useEffect } from 'react';
import './ManageReports.css';
import { useNavigate } from "react-router-dom";

const ManageReports = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/admin/home');
    };
    
    const [activeTab, setActiveTab] = useState('pending');
    const [reports, setReports] = useState([]);

    useEffect(() => {
        fetchReports();
    }, [activeTab]);

    const fetchReports = async () => {
        try {
            const response = await fetch(`/api/admin/reports?status=${activeTab}`);
            const data = await response.json();
            if (data.code === 0) {
                setReports(data.data);
            }
        } catch (error) {
            console.error('获取举报内容失败:', error);
        }
    };

    const handleProcess = async (reportId, action) => {
        try {
            await fetch(`/api/admin/reports/${reportId}/${action}`, {
                method: 'POST'
            });
            fetchReports();
        } catch (error) {
            console.error('处理举报失败:', error);
        }
    };

    return (
        <div className="manage-reports">
            <button onClick={handleBackClick} className='backBtn'>
                返回
            </button>
            <div className="tabs">
                <button 
                    className={activeTab === 'pending' ? 'active' : ''}
                    onClick={() => setActiveTab('pending')}
                >
                    未处理内容
                </button>
                <button 
                    className={activeTab === 'processed' ? 'active' : ''}
                    onClick={() => setActiveTab('processed')}
                >
                    已处理内容
                </button>
            </div>

            <div className="reports-list">
                {reports.map(report => (
                    <div key={report.id} className="report-item">
                        <div className="report-content">
                            <p>举报类型: {report.type}</p>
                            <p>举报原因: {report.reason}</p>
                            <p>举报时间: {new Date(report.createdAt).toLocaleString()}</p>
                            <p>内容: {report.content}</p>
                        </div>
                        {activeTab === 'pending' && (
                            <div className="report-actions">
                                <button onClick={() => handleProcess(report.id, 'ignore')}>
                                    忽略举报
                                </button>
                                <button onClick={() => handleProcess(report.id, 'hide')}>
                                    隐藏内容
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageReports;
