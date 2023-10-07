'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function InfoCard({ navUrl = '', logo = '', companyName = '', contact = '', address = '' }) {
    return (
        <>
            {/* Card Info */}
            <div className="absolute top-[4.5rem] w-full h-fit flex items-center justify-center opacity-10 hover:opacity:100 transition-opacity ease-in-out z-50 cursor-pointer">
                <div className="flex flex-row items-center justify-start overflow-hidden mx-12 w-fit h-[120px] absolute bg-white rounded-[15px] shadow z-40 px-8 py-4 gap-4">
                    {/* Logo */}
                    <Image src={logo}
                        width={100}
                        height={100}
                        className="rounded-[50%] shadow-lg"
                    />
                    {/* Content */}
                    <div className="flex flex-col items-start justify-center gap-2">
                        <h3 className="font-bold text-red-primary text-xs lg:text-xl">{companyName}</h3>
                        <p className="font-medium text-gray-400 text-xs lg:text-lg">{contact}</p>
                        <p className="font-medium text-gray-400 text-xs lg:text-lg">{address}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InfoCard;