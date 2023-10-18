'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function InfoCard({ data, navUrl = "#", showTag = false, detailPage = false }) {
    return (
        <>
            <Link
                href={navUrl}
                className={`absolute top-0 left-0 z-50 w-fit md:min-w-[450px] bg-slate-100 px-4 py-2 rounded-lg shadow-lg flex items-center overflow-hidden gap-2 m-2 hover:bg-white transition-all ease-in-out`}>
                <div className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] mr-2 relative shadow-md rounded-full">
                    <Image src={data?.logo ? data?.logo : '/banner.jpg'} alt="Logo" fill className="rounded-full" />
                </div>
                {
                    showTag ? (
                        <div className="flex justify-center items-start flex-col gap-1 drop-shadow">
                            <h1 className="text-base md:text-lg font-semibold text-red-primary line-clamp-1 truncate whitespace-nowrap inline-block md:max-w-[400px] max-w-[200px] w-full text-start">{data?.company_name}</h1>

                            <div className="flex flex-row">
                                <span className="shadow bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2">#photography</span>
                                <span className="shadow  bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2">#travel</span>
                            </div>
                        </div>

                    ) : (
                        <div className="flex justify-center items-start flex-col gap-1 drop-shadow w-fit">
                            <h1 className={`text-base md:text-lg font-semibold text-red-primary line-clamp-1 truncate whitespace-nowrap inline-block md:max-w-[400px] max-w-[200px] w-full text-start`}>{data?.company_name}</h1>
                            <p className={`text-xs md:text-sm text-gray-400 line-clamp-1 truncate whitespace-nowrap w-full text-start md:max-w-none max-w-[200px]`}>{data?.phone}</p>
                            <p className={`text-xs md:text-sm text-gray-400 line-clamp-1 truncate whitespace-nowrap w-full  text-start md:max-w-none max-w-[200px]`}>{data?.address}</p>
                        </div>
                    )
                }
            </Link>
        </>
    )
}

export default InfoCard;