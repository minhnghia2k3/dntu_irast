import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';

const Logout = () => {
    const [socket, setSocket] = useState(null);
    const route = useRouter();
    const HOST = 'http://localhost:8080'

    useEffect(() => {
        const newSocket = io(HOST, {
            withCredentials: true,
        });

        newSocket.on('connect', () => {
            console.log('Đã kết nối đến máy chủ');
        });

        setSocket(newSocket)
    }, [])

    function Logout() {
        localStorage.clear()
        route.push('/')
    }

    return (
        <div className='flex justify-center items-center flex-col h-full bg-gradient-to-r from-cyan-500 to-blue-500'>
            <div className='flex flex-col h-full bg-white my-20 py-20 px-10'>
                <p className='text-red-primary font-bold text-4xl mb-5'>IRAST - DNTU</p>

                <div className='flex flex-col items-start h-full'>
                    <button onClick={Logout}>Đăng xuất</button>
                </div>
            </div>
        </div>
    )
}

export default Logout