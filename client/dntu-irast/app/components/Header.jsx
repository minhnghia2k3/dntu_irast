'use client';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useRouter } from 'next/navigation';
import { LuSettings } from 'react-icons/lu'
import { IoLogOutOutline } from 'react-icons/io5'
function Header() {
    const [status, setStatus] = useState(false)
    const router = useRouter();
    const HOST = 'http://localhost:8080'

    useEffect(() => {
        setStatus(window.localStorage.getItem('status') === 'logged')
        const newSocket = io(HOST, {
            withCredentials: true,
            extraHeaders: {
                // Kiểm tra đã đăng nhập hay chưa
                'logged': localStorage.getItem('status'),
                // Cập nhật path name hiện tại của socket
                'pathName': window.location.pathname
            }
        });

        newSocket.on('connect', () => {
            console.log('Đã kết nối đến máy chủ')
        });

        // Kiểm tra user đã loggin hay chưa
        // Tại vì set giá trị mặc định cho status là false
        // Nên cần đoạn code này để kiểm tra
        const interval = setInterval(() => {
            const localStorageStatus = localStorage.getItem('status');
            if (localStorageStatus === 'logged') {
                setStatus(true);
            } else {
                setStatus(false);
            }
        }, 1000);

        // Nhận tín hiệu tham gia room tivi
        // Các đường dẫn tham gia Tivi
        // 1: domain/tivi : Homepage
        // 2: domain/detail/video/id:?device=tivi Video page
        if (window.location.href.includes('tivi')) {
            newSocket.emit('JoinTivi')
            console.log('đây là tivi')
        }
        newSocket.on('redirect', (data) => {
            console.log('đã nhận diều hướng')
            if (data === '/') {
                router.push('/tivi');
            } else {
                router.push(data + '?device=tivi')
            }
        })
        return () => clearInterval(interval);
    }, []);

    const Login = () => {
        router.push('/login')
    };
    const Logout = () => {
        router.push('/logout')
    }
    return (
        <header className="relative w-screen h-[80px] z-2 bg-white drop-shadow z-50 grid grid-cols-3 items-center">
            <Link href="/" onClick={() => handleNavigate("/")} className="col-span-2 flex flex-[80%] items-center justify-start select-none px-4 py-2 max-w-max h-[80px] bg-inherit focus-visible:outline-none">
                <Image src='/logo_dntu.png' priority={true} width={70} height={60} alt="Trường Đại Học Công Nghệ Đồng Nai Logo" className="drop-shadow-md" />
                <div className="flex flex-col">
                    <h1 className="text-red-primary font-medium text-lg lg:text-xl drop-shadow shadow-white tracking-widest">IRAST</h1>
                    <h1 className="text-red-primary font-medium text-[0.5rem] lg:text-lg drop-shadow shadow-white max-w-max">VIỆN NGHIÊN CỨU VÀ
                        ỨNG DỤNG KHOA HỌC CÔNG NGHỆ</h1>
                </div>
            </Link>
            <div className="col-span-1 flex items-center justify-end px-4 gap-4 h-[80px]">
                {
                    !status ?
                        (
                            <button onClick={Login} className="flex items-center justify-center text-black underline hover:text-blue-600">
                                <LuSettings size={20} />
                            </button>
                        ) :
                        (
                            <button onClick={Logout} className="flex items-center justify-center text-blue-400 underline hover:text-red-primary">
                                <IoLogOutOutline size={20} />
                            </button>
                        )
                }
            </div>
        </header >
    )
}
export default Header