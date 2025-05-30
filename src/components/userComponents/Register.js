import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Captcha } from 'react-captcha';

const Register = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [captchaCode, setCaptchaCode] = useState("");
    const [countdown, setCountdown] = useState(0);
    const navigate = useNavigate();

    const sendVerificationCode = async () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("请输入有效的邮箱地址");
            return;
        }
        
        try {
            const response = await fetch("/register/send-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            
            if (data.code === 0) {
                setCountdown(60);
                alert("验证码已发送到您的邮箱");
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("发送验证码失败，请重试");
        }
    };

    const verifyCode = async () => {
        try {
            const response = await fetch("/register/verify-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code: verificationCode })
            });
            const data = await response.json();
            
            if (data.code === 0) {
                setStep(2);
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("验证失败，请重试");
        }
    };

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert("两次输入的密码不一致");
            return;
        }

        try {
            const response = await fetch("/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    captchaCode
                })
            });
            const data = await response.json();
            
            if (data.code === 0) {
                alert("注册成功，3秒后跳转至答题界面");
                setTimeout(() => navigate("/register/entry-test"), 3000);
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("注册失败，请重试");
        }
    };

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    return (
        <div className="register-container">
            {step === 1 ? (
                <div className="email-verification">
                    <input
                        type="email"
                        placeholder="请输入邮箱"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button 
                        onClick={sendVerificationCode}
                        disabled={countdown > 0}
                    >
                        {countdown > 0 ? `${countdown}秒后重试` : "发送验证码"}
                    </button>
                    <input
                        type="text"
                        placeholder="请输入验证码"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                    />
                    <button onClick={verifyCode}>验证</button>
                </div>
            ) : (
                <div className="password-setup">
                    <input
                        type="password"
                        placeholder="请输入密码"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="请确认密码"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Captcha onChange={(code) => setCaptchaCode(code)} />
                    <button onClick={handleRegister}>注册</button>
                </div>
            )}
        </div>
    );
};

export default Register;