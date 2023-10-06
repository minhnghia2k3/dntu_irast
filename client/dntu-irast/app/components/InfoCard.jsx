'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function InfoCard({ navUrl = '', logo = '', companyName = '', contact = '', address = '' }) {
    return (
        <>
            <div className="overflow-hidden w-[90%] lg:w-[80%] shadow-md h-[150px] lg:h-auto absolute top-[25px] flex flex-row items-start gap-2 lg:gap-8 z-20 bg-slate-50 rounded-[15px] px-2 lg:px-8 py-2 opacity-10 hover:opacity-100 transition-opacity ease-in-out duration-300">
                <Link href={`/${navUrl}`} className="w-full h-full flex flex-row items-center justify-start lg:gap-8 gap-4">
                    <div className="_left flex-start">
                        <Image src={logo}
                            width={150}
                            height={150}
                            className="rounded-[50%] shadow-lg"
                        />
                    </div>
                    <div className="_right flex flex-col gap-2 lg:gap-4 lg:py-4">
                        <h3 className="font-bold text-red-primary text-xs lg:text-xl">{companyName}</h3>
                        <p className="font-medium text-gray-400 text-xs lg:text-lg">{contact}</p>
                        <p className="font-medium text-gray-400 text-xs lg:text-lg">{address}</p>
                        <div className="flex flex-row gap-2 items-center w-full h-full lg:py-2">
                            {/* <Link target='_blank' href="http://cohafood.vn" className="text-sm text-black hover:text-blue-400">
                                    <AiOutlineGlobal size={20} />
                                </Link>
                                <Link target='_blank' href="https://www.facebook.com/thuphamcohafood?mibextid=ZbWKwL" className="text-sm text-black hover:text-blue-400">
                                    <BsFacebook size={20} />
                                </Link> */}
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default InfoCard;