import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';

//这是一个页面，需要route，需要useEffect
const EntryTest = ({ 
    question, 
    questionNumber, 
    totalQuestions,
    onNext,
    onSubmit,
    isLastQuestion,
    timeUsed 
}) => {
    const [answer, setAnswer] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const navigate = useNavigate();

    const handleNext = () => {
        if (!answer && !selectedOption) {
            return;
        }

        const answerData = {
            answer: question.type === 'choice' ? selectedOption : answer,
            questionId: question.id,
            timeUsed: timeUsed
        };

        onNext(answerData);
        setSelectedOption('');
        setAnswer('');
    };

    const handleSubmit = async () => {
        if (!answer && !selectedOption) {
            return;
        }

        const finalAnswer = {
            answer: question.type === 'choice' ? selectedOption : answer,
            questionId: question.id,
            timeUsed: timeUsed,
            type: question.type
        };

        try {
            const response = await fetch('/api/test/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: localStorage.getItem('_id'),
                    answers: [...onSubmit(finalAnswer)]
                })
            });

            const data = await response.json();
            if (data.code === 0) {
                navigate('/waitlist');
            } else {
                alert('提交失败：' + data.message);
            }
        } catch (error) {
            console.error('提交答案失败:', error);
            alert('提交失败，请重试');
        }
    };

    return (
        <>
            <Nav />
            <main className='question-container'>
                <div className='question-header'>
                    <h2>第 {questionNumber} 题 / 共 {totalQuestions} 题</h2>
                    <span className='question-type'>
                        {question.type === 'choice' ? '选择题' : '简答题'}
                    </span>
                </div>

                <div className='question-content'>
                    <p className='question-text'>{question.description}</p>

                    {question.type === 'choice' ? (
                        <div className='options-container'>
                            {question.options.map((option, index) => (
                                <label key={index} className='option-label'>
                                    <input
                                        type='radio'
                                        name='option'
                                        value={option}
                                        checked={selectedOption === option}
                                        onChange={(e) => setSelectedOption(e.target.value)}
                                    />
                                    <span className='option-text'>{option}</span>
                                </label>
                            ))}
                        </div>
                    ) : (
                        <textarea
                            className='answer-input'
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder='请输入您的答案...'
                            rows={6}
                        />
                    )}
                </div>

                <div className='question-footer'>
                    {isLastQuestion ? (
                        <button 
                            className='submit-btn'
                            onClick={handleSubmit}
                            disabled={!answer && !selectedOption}
                        >
                            提交答案
                        </button>
                    ) : (
                        <button 
                            className='next-btn'
                            onClick={handleNext}
                            disabled={!answer && !selectedOption}
                        >
                            下一题
                        </button>
                    )}
                </div>
            </main>
        </>
    );
};

export default EntryTest;