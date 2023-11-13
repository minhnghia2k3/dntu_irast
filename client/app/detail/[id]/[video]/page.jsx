'use client';
import React, { useState } from 'react'
import Video from '@/components/Detail/Video.jsx';
import axios from 'axios';
import { GET_ALL_COMPANIES_ROUTE } from '@/utils/ApiRoutes';
function page({ params }) {
    const [company, setCompany] = useState(null)
    useState(() => {
        const getCompanyById = async () => {
            const res = await axios.get(`${GET_ALL_COMPANIES_ROUTE}?company_id=${params.video}`)
            if (res.status === 200 && res.data) {
                setCompany(res.data.data.shift())
            }
        }
        getCompanyById()
    }, [])
    return (
        <>
            {
                company ? (
                    <main>
                        <Video data={company} />
                    </main>
                ) : (
                    <div className="flex justify-center items-center w-screen h-screen">
                        <h1 className="text-3xl font-semibold text-gray-500">Loading...</h1>
                    </div>
                )
            }

        </>
    )
}

export default page