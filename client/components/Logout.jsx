import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';

const Logout = () => {
    const [socket, setSocket] = useState(null);
    const route = useRouter();
    const HOST = process.env.NEXT_PUBLIC_HOST || 'http://localhost:8080'

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
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Cài đặt
                        </h1>
                        <button onClick={() => { route.push('/admin') }} className="w-full bg-red-800 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Quản lý sản phẩm</button>
                        <button onClick={Logout} className="w-full bg-red-800 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Đăng xuất</button>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Logout