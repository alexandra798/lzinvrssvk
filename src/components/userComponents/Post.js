import React from 'react';
import { useNavigate } from 'react-router-dom';
import Comments from '../utils/Comments';

const Post = ({ post }) => {
    const navigate = useNavigate();

    const handlePostClick = () => {
        navigate(`/posts/${post.id}`);
    };

    return (
        <div className='post-preview' onClick={handlePostClick}>
            <h3 className='post-preview-title'>{post.title}</h3>
            <div className='post-preview-stats'>
                <Comments 
                    numberOfComments={post.replies.length} 
                    threadId={post.id}
                />
            </div>
        </div>
    );
};
//怎么让这个小小组件发送请求给后端要求获取post id和post.replies呢，这是一个问题

export default Post;
