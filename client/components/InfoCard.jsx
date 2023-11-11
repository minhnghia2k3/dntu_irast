'use client';
import { UPLOADS_API } from '@/utils/ApiRoutes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function InfoCard({ data, navUrl = "#", showTag = false, detailPage = false }) {
    return (
        <>
            <div className="flex items-center justify-center space-x-2 absolute z-10 top-5 left-5 max-w-xl min-w-[320px] px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="w-full mt-2 flex items-start flex-col">
                    <Link href={navUrl} className="text-start text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">{data.company_name}</Link>
                    <p className="max-w-xs line-clamp-2 text-base text-start mt-2 text-gray-600 dark:text-gray-300">{data.description}</p>
                </div>
                <div className="relative w-16 h-16">
                    <Image src={`${UPLOADS_API}/${data.logo}`} fill alt="Logo company" className="rounded-full object-contain" />
                </div>
            </div>
        </>
    )
}

export default InfoCard;