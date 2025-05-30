import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

//这是一个页面，需要route，需要useEffect
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('zh-CN');
};

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    // 获取分类列表
    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => {
                if (data.code === 200) {
                    setCategories(data.data);
                }
            })
            .catch(err => console.error(err));
    }, []);

    // 获取帖子列表
    useEffect(() => {
        const fetchPosts = () => {
            const url = currentCategory 
                ? `/api/posts/category/${currentCategory}`
                : '/api/posts/category/0';  // 0表示综合分类
                
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    if (data.code === 200) {
                        setPosts(data.data.list);
                    }
                })
                .catch(err => console.error(err));
        };
        
        fetchPosts();
    }, [currentCategory]);

    return (
        <div className="home-container">
            <Nav />
            <div className="content-wrapper">
                <aside className="category-sidebar">
                    <button 
                        className={`category-btn ${!currentCategory ? 'active' : ''}`}
                        onClick={() => setCurrentCategory(null)}
                    >
                        综合
                    </button>
                    {categories.map(category => (
                        <button
                            key={category.id}
                            className={`category-btn ${currentCategory === category.id ? 'active' : ''}`}
                            onClick={() => setCurrentCategory(category.id)}
                        >
                            {category.name}
                        </button>
                    ))}
                </aside>
                
                <main className="post-list">
                    {posts.map(post => (
                        <div key={post.id} className="post-item">
                            <h3 onClick={() => navigate(`/posts/${post.id}`)}>
                                {post.title}
                            </h3>
                            <div className="post-meta">
                                <span>{post.authorName}</span>
                                <span>{post.categoryName}</span>
                                <span>评论: {post.commentCount}</span>
                                <span>{formatDate(post.createdAt)}</span>
                            </div>
                        </div>
                    ))}
                </main>
            </div>
        </div>
    );
};

export default Home;