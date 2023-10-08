'use client';
import Images from '@/app/components/Detail/Images'
import React from 'react'
import mockdata from '@/app/mockdata.json'
import { motion } from 'framer-motion';
import Description from '@/app/components/Detail/Description';
import Banner from '@/app/components/Detail/Banner';
import InfoCard from '@/app/components/InfoCard';

function page({ params }) {
    const [companyId] = params.companyId || [];
    const filteredData = mockdata.filter((data) => data.id.toString() === companyId.toString()).shift()
    return (
        <>
            <main className="pb-8 bg-slate-200">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Banner data={filteredData} />
                    <div className="mx-8 md:mx-36 flex flex-col gap-4 relative">
                        <Description data={filteredData} />
                        <Images data={filteredData} />
                    </div>
                </motion.div>
            </main>
        </>
    )
}

export default page