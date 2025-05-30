import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UserAnswerDetail.css';

const UserAnswerDetail = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [answerDetail, setAnswerDetail] = useState({
        user: {},
        questions: [],
        totalScore: null,
        status: 'pending'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnswerDetail();
    }, [userId]);

    const fetchAnswerDetail = async () => {
        try {
            const response = await fetch(`/api/admin/answers/users/${userId}`);
            const data = await response.json();
            if (data.code === 0) {
                setAnswerDetail(data.data);
            }
        } catch (error) {
            console.error('获取答题详情失败:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleScoreChange = async (questionId, score) => {
        try {
            await fetch(`/api/admin/answers/users/${userId}/questions/${questionId}/score`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(score)
            });
            
            // 更新本地状态
            setAnswerDetail(prev => ({
                ...prev,
                questions: prev.questions.map(q => 
                    q.id === questionId ? { ...q, score } : q
                )
            }));
        } catch (error) {
            console.error('更新分数失败:', error);
        }
    };

    const calculateTotalScore = async () => {
        try {
            const response = await fetch(`/api/admin/answers/users/${userId}/calculate`, {
                method: 'POST'
            });
            const data = await response.json();
            if (data.code === 0) {
                setAnswerDetail(prev => ({
                    ...prev,
                    totalScore: data.data.totalScore,
                    isPassed: data.data.totalScore >= 38
                }));
            }
        } catch (error) {
            console.error('计算总分失败:', error);
        }
    };

    const handleActivation = async (isPass) => {
        if (!window.confirm(isPass ? 
            '确定通过该用户的答题？' : 
            '确定不通过该用户的答题？这将导致该账号被永久注销')) {
            return;
        }

        try {
            await fetch(`/api/admin/answers/users/${userId}/activate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(isPass)
            });
            
            navigate('/admin/review-answers');
        } catch (error) {
            console.error('处理用户激活失败:', error);
        }
    };

    if (loading) {
        return <div>加载中...</div>;
    }

    return (
        <div className="answer-detail">
            <div className="user-info">
                <h2>用户答题详情</h2>
                <p>用户邮箱: {answerDetail.user.email}</p>
                <p>答题时间: {answerDetail.user.answerTime}</p>
            </div>

            <div className="questions-list">
                {answerDetail.questions.map((question, index) => (
                    <div key={question.id} className="question-item">
                        <div className="question-header">
                            <span className="question-number">第 {index + 1} 题</span>
                            <span className="time-used">用时: {question.timeUsed}秒</span>
                        </div>
                        
                        <div className="question-content">
                            <p>{question.content}</p>
                            {question.type === 'CHOICE' && (
                                <div className="options">
                                    {question.options.map((option, idx) => (
                                        <div key={idx} className={`option ${
                                            option === question.userAnswer ? 'selected' : ''
                                        }`}>
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {question.type === 'TEXT' && (
                                <div className="text-answer">
                                    <p>用户答案:</p>
                                    <div className="answer-content">{question.userAnswer}</div>
                                </div>
                            )}
                        </div>

                        {answerDetail.status === 'pending' && (
                            <div className="score-buttons">
                                <button 
                                    className={question.score === 0 ? 'active' : ''}
                                    onClick={() => handleScoreChange(question.id, 0)}>
                                    0分
                                </button>
                                <button 
                                    className={question.score === 1 ? 'active' : ''}
                                    onClick={() => handleScoreChange(question.id, 1)}>
                                    1分
                                </button>
                            </div>
                        )}
                        {answerDetail.status === 'activated' && (
                            <div className="score-display">
                                得分: {question.score}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {answerDetail.status === 'pending' && (
                <div className="action-buttons">
                    <button 
                        className="calculate-btn"
                        onClick={calculateTotalScore}>
                        计算总分
                    </button>
                    
                    {answerDetail.totalScore !== null && (
                        <div className="result-section">
                            <p className="total-score">
                                总分: {answerDetail.totalScore}/40
                                {answerDetail.isPassed ? 
                                    <span className="pass">通过</span> : 
                                    <span className="fail">不通过</span>
                                }
                            </p>
                            <div className="confirm-buttons">
                                <button 
                                    className="confirm-btn"
                                    onClick={() => handleActivation(true)}
                                    disabled={!answerDetail.isPassed}>
                                    确定通过
                                </button>
                                <button 
                                    className="reject-btn"
                                    onClick={() => handleActivation(false)}
                                    disabled={answerDetail.isPassed}>
                                    确定不通过
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserAnswerDetail;
