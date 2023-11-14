'use client';
import React, { useState } from 'react'
import Video from '@/components/Detail/Video.jsx';
import axios from 'axios';
import { GET_ALL_COMPANIES_ROUTE, GET_ALL_COMPANY_PRODUCT } from '@/utils/ApiRoutes';
function page({ params }) {
    const [company, setCompany] = useState(null)
    const [companyProduct, setCompanyProduct] = useState([])
    useState(() => {
        const getCompanyById = async (id) => {
            const res = await axios.get(`${GET_ALL_COMPANIES_ROUTE}?company_id=${id}`)
            if (res.status === 200 && res.data) {
                setCompany(res.data.data.shift())
            }
        }

        const companyProduct = async (companyId) => {
            const { data } = await axios.get(`${GET_ALL_COMPANY_PRODUCT}${companyId}`)
            if (!data) return null
            setCompanyProduct(data)
        }

        getCompanyById(params.video)
        companyProduct(params.video);
    }, [])
    return (
        <>
            {
                company ? (
                    <main>
                        <Video data={company} companyProduct={companyProduct?.data || []} />
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