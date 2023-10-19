'use client';
import React from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
function Redirect({ data: { logo, name, id } }) {
    const router = useRouter();
    const handleShowDetail = () => {
        router.push(`/detail/${id}`)
    }
    const handleShowTV = () => {
        console.log('show tv')
    }
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
            <h1 className="text-red-800 font-medium tracking-wide text-xl md:text-2xl text-center">
                Sản phẩm công ty {`${name}`}
            </h1>
            <div className="flex items-center justify-center gap-4 mt-8 mx-4">
                <button onClick={handleShowDetail} className="bg-red-800 px-4 py-2 text-white rounded flex-2 text-lg md:text-xl">Xem chi tiết sản phẩm</button>
                <button onClick={handleShowTV} className="bg-blue-800 px-4 py-2 text-white rounded flex-2 text-lg md:text-xl">Hiển thị trên màn hình lớn</button>
            </div>
            <div className="flex items-center justify-center gap-4 mt-8">
                <Image src={logo} alt={`${name} logo`} width={300} height={300} />
            </div>
        </div>
    )
}

export default Redirect