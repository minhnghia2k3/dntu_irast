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

    function signIn() {
        alert('Gửi tới server')
        socket.emit('signIn', {
            username: username,
            password: password
        })
    }

    return (
        <div className='flex justify-center items-center flex-col h-full bg-gradient-to-r from-cyan-500 to-blue-500'>
            <div className='flex flex-col h-full bg-white my-20 py-20 px-10'>
                <p className='text-red-primary font-bold text-4xl mb-5'>IRAST - DNTU</p>

                <div className='flex flex-col items-start h-full'>
                    <input value={username} type="text" placeholder='Tên đăng nhập' onInput={e => setUsername(e.target.value)} />
                    <input value={password} type="password" placeholder='Mật khẩu' onInput={e => setPassword(e.target.value)} />
                    <button onClick={signIn}>Đăng nhập</button>
                    {error &&
                        <div className='bg-red-600 text-white'>
                            <p>Tên tài khoản hoặc mật khẩu sai!</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Login