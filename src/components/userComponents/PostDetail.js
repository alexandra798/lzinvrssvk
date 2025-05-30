import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "../Nav";
import Comment from "../Comment";

const PostDetail = () => {
    const [post, setPost] = useState({
        id: "",
        title: "",
        content: "",
        authorName: "",
        categoryId: "",
        createdAt: "",
        updatedAt: "",
        isHidden: false,
        status: 1
    });
    const handleBackClick = () => {
        navigate('/home');
    };
    const [comment, setComment] = useState(""); //此条post已有的评论（每当有人提交一条新评论，这个state就会更新
    const [commentList, setCommentList] = useState([]); //此条post已有的评论列表，点进详情页就开始展示。由comment的state来决定
    const [replyTo, setReplyTo] = useState(null); // 用于记录用户想回复的楼层
    const [isCommentBoxVisible, setIsCommentBoxVisible] = useState(false); //点击某按钮后才会显示的commentbox
    const { id } = useParams(); //这是什么？？

    // 1.副作用：点进页面后就开始获取如下数据
    useEffect(() => {
        const fetchPostDetails = () => {
            fetch(`/posts/${post.id}`)
                .then((res) => res.json())
                .then((data) => {
                    setPost(data.post);
                    // 按时间顺序排序评论
                    const sortedComments = data.comments.sort(
                        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                    );
                    setCommentList(sortedComments);
                })
                .catch((err) => console.error(err));
        };
        fetchPostDetails();
    }, [id]);
    
    
    // 2.点击添加评论按钮，弹出文本输入框
    const addComment = () => {
        const commentData = {
            content: comment,
            postId: id,
            userId: localStorage.getItem("_id"),
            replyToFloor: replyTo  // 改为replyToFloor
        };

        fetch("/comments", {
            method: "POST",
            body: JSON.stringify(commentData),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setCommentList([...commentList, data.comment]);
                setComment("");
                setReplyTo(null); // 重置回复目标
            })
            .catch((err) => console.error(err));
    };




    

    // 3. 点击文本输入框下方的提交按钮
    const handleSubmitComment = (e) => {
        e.preventDefault();
        addComment();
    };

    // 4.点击楼层中“回复”按钮以设置回复对象
    const handleReplyClick = (commentId, floorNumber) => {
        if (!isCommentBoxVisible) {
            setIsCommentBoxVisible(true);
        }
        
        // 在评论内容中插入可点击的楼层标记
        const floorTag = `[@${floorNumber}楼]`;
        setComment(prevComment => {
            // 如果评论框为空，直接插入标记
            if (!prevComment.trim()) {
                return floorTag + ' ';
            }
            // 如果评论框已有内容，在光标位置插入标记
            return prevComment + ' ' + floorTag + ' ';
        });
        
        // 记录被回复的评论ID，用于后端关联
        setReplyTo(commentId);
    };

    // 取消回复的按钮
    const handleCancelReply = () => {
        setReplyTo(null);
        setComment("");
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('zh-CN');
    };

    // 解析评论内容中的楼层标记，转换为可点击的链接
    const renderCommentContent = (content) => {
        const parts = content.split(/(\[@\d+楼\])/g);
        return parts.map((part, index) => {
            const match = part.match(/\[@(\d+)楼\]/);
            if (match) {
                const floor = parseInt(match[1]);
                return (
                    <span
                        key={index}
                        className="floor-mention"
                        onClick={() => handleJumpToFloor(floor)}
                    >
                        @{floor}楼
                    </span>
                );
            }
            return part;
        });
    };

    // 跳转到指定楼层
    const handleJumpToFloor = (floor) => {
        const element = document.getElementById(`comment-${floor}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            element.classList.add('highlight');
            setTimeout(() => element.classList.remove('highlight'), 2000);
        }
    };

    return (
        <>
            <Nav />
            <button onClick={handleBackClick} className='backBtn'>
                    返回
            </button>
            <main className='post-detail'>
                <div className='post-content'>
                    <h1 className='post-title'>{post.title}</h1>
                    <div className='post-meta'>
                        <span>发布时间：{formatDate(post.createdAt)}</span>
                        {post.updatedAt !== post.createdAt && (
                            <span>最后修改：{formatDate(post.updatedAt)}</span>
                        )}
                    </div>
                    <div className='post-body'>{post.content}</div>
                </div>

                <div className='comments-section'>
                    <h2>评论 ({commentList.length})</h2>
                    
                    <form id="comment-form" className='comment-form' onSubmit={handleSubmitComment}>
                        {replyTo && (
                            <div className="replying-to">
                                正在回复 {replyTo} 楼
                                <button 
                                    type="button" 
                                    className="cancel-reply" 
                                    onClick={handleCancelReply}
                                >
                                    取消回复
                                </button>
                            </div>
                        )}
                        <textarea
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder='发表评论...'
                            required
                        />
                        <button className='submit-btn'>
                            {replyTo ? '回复评论' : '发表评论'}
                        </button>
                    </form>

                    <div className='comments-list'>
                        {commentList.map((comment, index) => (
                            <Comment
                                key={comment.id}
                                comment={{
                                    ...comment,
                                    content: renderCommentContent(comment.content)
                                }}
                                index={index}
                                onReply={handleReplyClick}
                                commentList={commentList}
                                formatDate={formatDate}
                            />
                        ))}
                    </div>
                </div>

                <button 
                    className="floating-comment-btn"
                    onClick={() => setIsCommentBoxVisible(true)}
                >
                    评论
                </button>

                {isCommentBoxVisible && (
                    <div className="comment-modal">
                        <div className="comment-modal-content">
                            <button 
                                className="close-btn"
                                onClick={() => {
                                    setIsCommentBoxVisible(false);
                                    setComment("");
                                    setReplyTo(null);
                                }}
                            >
                                ×
                            </button>
                            <form onSubmit={handleSubmitComment}>
                                <textarea
                                    rows={4}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder='发表评论...'
                                    required
                                />
                                <button type="submit" className='submit-btn'>
                                    发表评论
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
};

export default PostDetail;