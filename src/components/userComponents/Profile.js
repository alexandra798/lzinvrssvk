import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../Nav';

const Profile = () => {
    const [userInfo, setUserInfo] = useState({
        userId: '',
        email: '',
        points: 0,
        isPremium: false
    });
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userId = localStorage.getItem('_id');
                if (!userId) {
                    navigate('/');
                    return;
                }

                const response = await fetch('/user/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${userId}`
                    }
                });
                const data = await response.json();
                setUserInfo(data);
            } catch (error) {
                console.error('获取用户信息失败:', error);
            }
        };

        fetchUserInfo();
    }, [navigate]);

    return (
        <>
            <Nav />
            <main className='profile'>
                <h1 className='profileTitle'>个人资料</h1>
                
                <div className='profile__container'>
                    <div className='profile__item'>
                        <label>用户ID：</label>
                        <span>{userInfo.userId}</span>
                    </div>
                    
                    <div className='profile__item'>
                        <label>邮箱：</label>
                        <span>{userInfo.email}</span>
                    </div>
                    
                    <div className='profile__item'>
                        <label>积分：</label>
                        <span>{userInfo.points}</span>
                    </div>
                    
                    <div className='profile__item'>
                        <label>会员状态：</label>
                        <span>{userInfo.isPremium ? '已开通' : '未开通'}</span>
                    </div>

                    <div className='profile__buttons'>
                        <Link to="/profile/manage-password" className='profileBtn'>
                            修改密码
                        </Link>
                        
                        <Link to="/profile/payment" className='profileBtn'>
                            会员缴费
                        </Link>
                        
                        <Link to="/profile/answer-records" className='profileBtn'>
                            答题记录
                        </Link>

                        <Link to="/profile/rules" className='profileBtn'>
                            规则
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
};
//记得给这个页面编写返回键

export default Profile;
