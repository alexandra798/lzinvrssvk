import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

//没决定好要让它当复合组件还是页面
const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const notificationRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const userId = localStorage.getItem('_id');
                const response = await fetch(`/api/notifications/${userId}`);
                const data = await response.json();
                setNotifications(data.sort((a, b) => 
                    new Date(b.createdAt) - new Date(a.createdAt)
                ));
            } catch (error) {
                console.error('获取通知失败:', error);
            }
        };

        fetchNotifications();
    }, []);

    const handleNotificationClick = (notification) => {
        navigate(`/${notification.postId}/replies`, {
            state: { scrollToComment: notification.commentId }
        });
        setIsVisible(false);
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return '刚刚';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`;
        return `${Math.floor(diff / 86400000)}天前`;
    };

    return (
        <div className="notification-container" ref={notificationRef}>
            <button 
                className="notification-btn"
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
            >
                通知
                {notifications.length > 0 && (
                    <span className="notification-badge">{notifications.length}</span>
                )}
            </button>

            {isVisible && (
                <div className="notification-dropdown">
                    {notifications.length === 0 ? (
                        <div className="no-notifications">暂无通知</div>
                    ) : (
                        notifications.map(notification => (
                            <div
                                key={notification.id}
                                className="notification-item"
                                onClick={() => handleNotificationClick(notification)}
                            >
                                <div className="notification-content">
                                    {notification.content}
                                </div>
                                <div className="notification-time">
                                    {formatTime(notification.createdAt)}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Notification;
