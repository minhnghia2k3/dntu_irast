'use client';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

function Header() {
    const [socket, setSocket] = useState(null);
    const [position, setPosition] = useState(0);
    useEffect(() => {
        const newSocket = io('http://localhost:8080');

        newSocket.on('connect', () => {
            console.log('Đã kết nối đến máy chủ');
        });

        newSocket.on('requestConnection', (requesterSocketId) => {
            console.log('Máy khách B đã nhận yêu cầu kết nối từ máy khách A');
            // Gửi sự kiện đến máy chủ để xác nhận kết nối
            newSocket.emit('confirmConnection', requesterSocketId);
        });

        newSocket.on('scrollTo', (newPosition) => {
            console.log(`Đã lướt đến vị trí ${newPosition}`);
            // Cập nhật vị trí cuộn của máy khách B khi máy khách A lướt
            setPosition(newPosition);
            // Tự động cuộn đến vị trí mới
            window.scrollTo(0, newPosition);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        // Xử lý sự kiện cuộn trang của người dùng A
        const handleScroll = () => {
            const newPosition = window.scrollY;
            // Gửi sự kiện đến máy chủ để thông báo vị trí lướt của máy khách A
            socket.emit('scrollTo', newPosition);
        };

        // Đăng ký sự kiện cuộn trang
        window.addEventListener('scroll', handleScroll);

        return () => {
            // Hủy đăng ký sự kiện cuộn trang khi component unmount
            window.removeEventListener('scroll', handleScroll);
        };
    }, [socket]);

    const handleConnectToB = () => {
        // Gửi yêu cầu kết nối đến máy khách B
        socket.emit('connectToB');
    };
    return (
        <header className="relative w-screen h-[80px] z-2 bg-white drop-shadow z-50">
            <Link href="/" className="flex items-center justify-start select-none px-4 py-2 max-w-max h-full bg-inherit focus-visible:outline-none">
                <Image src='/logo_dntu.png' priority={true} width={70} height={60} alt="Trường Đại Học Công Nghệ Đồng Nai Logo" className="drop-shadow-md" />
                <div className="flex flex-col">
                    <h1 className="text-red-primary font-medium text-lg lg:text-xl drop-shadow shadow-white tracking-widest">IRAST</h1>
                    <h1 className="text-red-primary font-medium text-[0.5rem] lg:text-lg drop-shadow shadow-white max-w-max">VIỆN NGHIÊN CỨU VÀ
                        ỨNG DỤNG KHOA HỌC CÔNG NGHỆ</h1>
                </div>
            </Link>
            <p>{position}</p>
            <button onClick={handleConnectToB}>Kết nối đến máy khách B</button>
        </header >
    )
}

export default Header