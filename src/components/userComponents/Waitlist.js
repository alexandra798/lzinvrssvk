import React from "react";
import { useState, useEffect } from "react";

const Waitlist = () => {
    const [submitTime, setSubmitTime] = useState(null);
    const userId = localStorage.getItem('_id');

    useEffect(() => {
        const fetchSubmitTime = async () => {
            try {
                const response = await fetch(`/api/admin/answers/users/${userId}`);
                const data = await response.json();
                if (data.code === 0) {
                    setSubmitTime(data.data.user.answerTime);
                }
            } catch (error) {
                console.error('获取提交时间失败:', error);
            }
        };

        fetchSubmitTime();
    }, [userId]);

    return (
        <div>
            <p>
                你的入站测试作答已于
                {submitTime ? new Date(submitTime).toLocaleString('zh-CN', {
                    timeZone: 'UTC',
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                }) : '加载中...'}
                （零时区）提交！审核用时最多两周，期间你可以登录账号以查询审核结果。若跳转到此页面说明审核仍在进行中。
            </p>
        </div>
    );
};

export default Waitlist;