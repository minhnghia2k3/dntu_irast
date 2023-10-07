import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [socket, setSocket] = useState(null);
    const [error, setError] = useState(false);
    const route = useRouter();
    const HOST = 'http://localhost:8080'

    useEffect(() => {
        const newSocket = io(HOST, {
            withCredentials: true,
        });

        newSocket.on('connect', () => {
            console.log('Đã kết nối đến máy chủ');
        });
        newSocket.on('Complete', () => {
            window.localStorage.setItem('status', 'logged')
            route?.push('/')
        })
        newSocket.on('error', () => {
            setError(true)
        })
        setSocket(newSocket)
    }, [])

    function signIn(e) {
        e.preventDefault();
        alert('Gửi tới server')
        socket.emit('signIn', {
            username: username,
            password: password
        })
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Đăng nhập để đồng bộ thiết bị với TV
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            action="#"
                        >
                            <div>
                                <label htmlFor="account" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tài khoản</label>
                                <input
                                    type="text"
                                    name="account"
                                    id="account"
                                    value={username} onInput={e => setUsername(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập tài khoản" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    value={password} onInput={e => setPassword(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            {error && (
                                <div className='text-red-500 dark:text-red-500 text-sm'>
                                    <p>Tên tài khoản hoặc mật khẩu sai!</p>
                                </div>
                            )}

                            <button
                                onClick={(e) => signIn(e)}
                                type="submit"
                                className="w-full bg-red-800 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Login