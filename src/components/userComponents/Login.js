import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//这是一个页面，需要route，需要useEffect
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            if (data.code === 0) {
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('userId', data.data.userId);
                navigate('/home');
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('登录失败，请重试');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="邮箱"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">登录</button>
            </form>
        </div>
    );
};

export default Login;