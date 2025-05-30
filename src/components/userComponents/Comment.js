import React from 'react';

//只是一个普通的组件，里面包含了很多按钮
const Comment = ({ 
    comment, 
    index, 
    onReply, 
    commentList,
    formatDate 
}) => {
    // 一个普通的变量，由comment们创造出来
    const repliesTo = commentList.filter(c => c.replyTo === comment.id);
    
    // 如果此评论是回复其他评论的，找到原评论的楼层
    const findOriginalFloor = () => {
        if (!comment.replyTo) {
            return null;
        }
        const originalComment = commentList.find(c => c.id === comment.replyTo);
        return originalComment ? commentList.indexOf(originalComment) + 1 : null;
    };

    const handleJumpToFloor = (floor) => {
        const element = document.getElementById(`comment-${floor}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            element.classList.add('highlight');
            setTimeout(() => element.classList.remove('highlight'), 2000);
        }
    };

    const handleReport = () => {
        fetch(`/api/comments/${comment.id}/report`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: localStorage.getItem('_id')
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.code === 200) {
                alert('举报成功');
            } else {
                alert(data.message);
            }
        })
        .catch(err => console.error(err));
    };

    return (
        <div id={`comment-${index + 1}`} className='comment-item'>
            <div className='comment-header'>
                <span className='floor-number'>{index + 1} 楼</span>
                <span className='comment-author'>{comment.userName}</span>
            </div>
            
            <div className='comment-content'>
                {comment.replyTo && (
                    <div className='reply-reference' onClick={() => handleJumpToFloor(findOriginalFloor())}>
                        回复 {findOriginalFloor()} 楼 ↑
                    </div>
                )}
                {comment.content}
            </div>
            
            <div className='comment-footer'>
                <div className='comment-meta'>
                    <span className='comment-time'>{formatDate(comment.createdAt)}</span>
                    {repliesTo.length > 0 && (
                        <div className='replies-info'>
                            {repliesTo.map((reply, i) => {
                                const replyFloor = commentList.indexOf(reply) + 1;
                                return (
                                    <button 
                                        key={i}
                                        className='floor-link'
                                        onClick={() => handleJumpToFloor(replyFloor)}
                                    >
                                        {replyFloor}楼 ↓
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
                <button 
                    className='reply-btn'
                    onClick={() => onReply(comment.id, index + 1)}
                >
                    回复
                </button>
                <button 
                    className='report-btn'
                    onClick={handleReport}
                >
                    举报
                </button>
            </div>
        </div>
    );
};

export default Comment;








