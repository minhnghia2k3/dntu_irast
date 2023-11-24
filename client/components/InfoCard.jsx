'use client';
import { UPLOADS_API } from '@/utils/ApiRoutes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function InfoCard({ data: company, navUrl = "#", showTag = false, detailPage = false }) {
    return (
        <>
            <div className="bg-white rounded flex items-center justify-between absolute top-5 left-10 z-10 px-4 py-1.5 shadow gap-4 w-96">
                <div className='w-14 h-14 relative'>
                    <Image src={company.logo} alt="Logo company" fill className="shadow rounded-full object-cover" />
                </div>
                <div className="flex flex-col flex-1 items-start">
                    <Link href={navUrl} className="ml-1 text-sm font-semibold text-gray-700 text-start">{company.name}</Link>
                    <p className="ml-1 text-sm text-gray-700">{company.tag}</p>
                </div>
            </div>
        </>
    )
}

export default InfoCard;