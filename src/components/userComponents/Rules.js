import React from 'react';
import Nav from '../Nav';
import { useNavigate } from "react-router-dom";


const Rules = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/profile');
    };
    return (
        <>
            <Nav />
            
            <button onClick={handleBackClick} className='backBtn'>
                    返回
            </button>

            <main className='rules'>
                <h1 className='rules-title'>规则</h1>
                <div className='rules-content'>
                    <section className='rules-section'>
                        <h2>1. 论坛原则</h2>
                        <ul>
                            <li>不求助、不交友、不打母婴领养广告</li>
                            <li>不暴露个人信息</li>
                            <li>维护网站安全，谨防盗号</li>
                        </ul>
                    </section>

                    <section className='rules-section'>
                        <h2>2. 发言准则</h2>
                        <ul>
                            <li>不重复发帖</li>
                            <li>遵守分区的发帖规则</li>
                            <li>善用举报键</li>
                        </ul>
                    </section>
                </div>
            </main>
        </>
    );
};

export default Rules;
