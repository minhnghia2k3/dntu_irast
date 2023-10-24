'use client';
import { UPLOADS_API } from '@/utils/ApiRoutes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function InfoCard({ data, navUrl = "#", showTag = false, detailPage = false }) {
    return (
        <>
            <div className="absolute z-10 top-5 left-5 max-w-xl min-w-[320px] px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="w-full overflow-x-hidden mt-2 flex items-start flex-col">
                    <Link href={navUrl} className="text-start text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">{data.company_name}</Link>
                    <p className="overflow-x-hidden line-clamp-2 text-base text-start mt-2 text-gray-600 dark:text-gray-300">{data.description}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <Link href={navUrl} className="text-blue-600 dark:text-blue-400 hover:underline">Đọc thêm ⟶</Link>
                    <div className="relative w-16 h-16">
                        <Image src={`${UPLOADS_API}/${data.logo}`} fill alt="Author Photo" className="hidden object-cover rounded-full sm:block" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default InfoCard;