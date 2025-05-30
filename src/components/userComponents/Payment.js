import React, { useState, useEffect } from 'react';
import Nav from '../Nav';

const Payment = () => {
    const [paymentInfo, setPaymentInfo] = useState({
        amount: 0,
        walletAddress: '',
        nextMonth: ''
    });
    
    useEffect(() => {
        const fetchPaymentInfo = async () => {
            try {
                const response = await fetch('/profile/payment');
                const data = await response.json();
                
                // 获取下个月
                const date = new Date();
                date.setMonth(date.getMonth() + 1);
                const nextMonth = date.getMonth() + 1;
                
                setPaymentInfo({
                    ...data,
                    nextMonth: nextMonth
                });
            } catch (error) {
                console.error('获取支付信息失败:', error);
            }
        };

        fetchPaymentInfo();
    }, []);

    return (
        <>
            <Nav />
            <main className='non-premium'>
                <div className='payment-info'>
                    <h2>会员费用信息</h2>
                    <p className='payment-notice'>
                        你于{paymentInfo.nextMonth}月应缴纳的会员费是 {paymentInfo.amount} USD。
                        你需要在本月倒数第二天零时区23:00前完成支付。
                    </p>
                    <div className='wallet-info'>
                        <h3>支付地址</h3>
                        <div className='wallet-address'>
                            {paymentInfo.walletAddress}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Payment;
