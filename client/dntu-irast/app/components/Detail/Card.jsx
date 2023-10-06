"use client";
import Image from 'next/image';
import React from 'react'

function Card({ data: { address, contact, description, id, images, logo, name, videoUrl, websiteUrl } }) {
    return (
        <>
            {/* Card Info */}
            <div className="relative w-screen h-[50vh] flex items-center justify-center">
                <Image
                    src={'/banner.jpg'}
                    layout="fill"
                    alt=""
                />
                <div className="flex flex-row items-center justify-start overflow-hidden mx-12 w-fit h-[120px] absolute -bottom-[85px] bg-white rounded-[15px] shadow z-40 px-8 py-4 gap-4">
                    {/* Logo */}
                    <Image src={logo}
                        width={100}
                        height={100}
                        className="rounded-[50%] shadow-lg"
                    />
                    {/* Content */}
                    <div className="flex flex-col items-start justify-center gap-2">
                        <h3 className="font-bold text-red-primary text-xs lg:text-xl">{name}</h3>
                        <p className="font-medium text-gray-400 text-xs lg:text-lg">{contact}</p>
                        <p className="font-medium text-gray-400 text-xs lg:text-lg">{address}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card