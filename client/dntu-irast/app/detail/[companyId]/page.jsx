'use client';
import Images from '@/app/components/Detail/Images'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import Description from '@/app/components/Detail/Description';
import Banner from '@/app/components/Detail/Banner';
import Footer from '@/app/components/Footer';

import axios from 'axios';
import { GET_ALL_COMPANIES_ROUTE } from '@/utils/ApiRoutes';
function page({ params }) {
    const [company, setCompany] = useState(null)
    const { companyId } = params;
    useState(() => {
        const getCompanyById = async () => {
            const res = await axios.get(`${GET_ALL_COMPANIES_ROUTE}?company_id=${companyId}`)
            if (res.status === 200 && res.data) {
                setCompany(res.data.shift())
            }
        }
        getCompanyById()
    }, [])

    return (
        <>
            {
                company ? (
                    <main className="pb-8 bg-slate-200">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Banner data={company} />
                            <div className="mx-2 md:mx-24 flex flex-col gap-4 relative">
                                <Description data={company} />
                                <Images data={company} />
                            </div>
                        </motion.div>
                    </main>
                ) : (
                    <div className="flex justify-center items-center w-screen h-screen">
                        <h1 className="text-3xl font-semibold text-gray-500">Loading...</h1>
                    </div>
                )
            }
            <Footer />
        </>
    )
}

export default page