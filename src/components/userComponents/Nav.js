import React from "react";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";

//这是一个复合组件
const Nav = () => {
    const navigate = useNavigate();
    
    const signOut = () => {
        localStorage.removeItem("_id");
        navigate("/");
    };
    
    return (
        <nav className='navbar'>
            <div className="navbar-left">
                <button onClick={() => navigate('/home')} className="nav-btn">
                    首页
                </button>
            </div>
            
            <h2>Threadify</h2>
            
            <div className='navbarRight'>
                <Notification />
                <button onClick={() => navigate('/profile')} className="nav-btn">
                    个人资料
                </button>
                <button onClick={signOut} className="nav-btn">
                    退出
                </button>
            </div>
        </nav>
    );
};

export default Nav;