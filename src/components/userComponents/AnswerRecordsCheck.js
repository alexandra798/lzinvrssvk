import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AnswerRecordsCheck.css';

//这是一个页面，需要route，需要useEffect
const CheckAnswerRecords = () => {
    const [answerRecord, setAnswerRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const init = async () => {
            const isLoggedIn = await checkLoginStatus();
            if (isLoggedIn) {
                fetchAnswerRecord();
            } else {
                navigate('/login');
            }
        };
        init();
    }, []);

    const checkLoginStatus = async () => {
        try {
            const response = await fetch('/auth/check-login', {
                credentials: 'include',
            });
            return response.ok;
        } catch (error) {
            console.error('登录状态检查失败:', error);
            return false;
        }
    };

    const fetchAnswerRecord = async () => {
        try {
            const response = await fetch('/profile/answer-records', {
                credentials: 'include',
            });
            const data = await response.json();

            if (data.code === 0) {
                setAnswerRecord(data.data);
            } else {
                navigate('/login');
            }
        } catch (error) {
            console.error('获取答题记录失败:', error);
            navigate('/login');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">加载中...</div>;
    }

    if (!answerRecord) {
        return null;
    }

    return (
        <div className="check-answer-records">
            <h2>入站测试记录</h2>
            <div className="answer-summary">
                <div className="summary-item">
                    <label>提交时间：</label>
                    <span>{new Date(answerRecord.submitTime).toLocaleString()}</span>
                </div>
                <div className="summary-item">
                    <label>总分：</label>
                    <span>{answerRecord.totalScore}/40</span>
                </div>
                <div className="summary-item">
                    <label>状态：</label>
                    <span className="passed">通过</span>
                </div>
            </div>

            <div className="answers-detail">
                <h3>详细答题记录</h3>
                {answerRecord.answers.map((answer, index) => (
                    <div key={answer.questionId} className="answer-item">
                        <div className="question-info">
                            <h4>问题 {index + 1}</h4>
                            <p>{answer.questionContent}</p>
                        </div>
                        <div className="answer-info">
                            <div className="user-answer">
                                <label>你的答案：</label>
                                <p>{answer.userAnswer}</p>
                            </div>
                            <div className="score-info">
                                <label>得分：</label>
                                <span>{answer.score}</span>
                            </div>
                        </div>
                        <div className="time-info">
                            <label>用时：</label>
                            <span>{Math.floor(answer.timeUsed / 60)}分{answer.timeUsed % 60}秒</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheckAnswerRecords;

