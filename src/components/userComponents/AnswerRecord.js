import React, { useState, useEffect } from 'react';

const AnswerRecord = () => {
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

};

export default AnswerRecord;