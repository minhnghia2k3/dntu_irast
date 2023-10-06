'use client';
import Images from '@/app/components/Detail/Images'
import React from 'react'
import mockdata from '@/app/mockdata.json'
import { motion } from 'framer-motion';
import Card from '@/app/components/Detail/Card';
import Description from '@/app/components/Detail/Description';

function page({ params }) {
    const [companyId] = params.companyId || [];
    const filteredData = mockdata.filter((data) => data.id.toString() === companyId.toString()).shift()
    return (
        <>
            <main>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card data={filteredData} />
                    <div className="mx-12 md:mx-36 flex flex-col gap-4">
                        <Description data={filteredData} />
                        <Images data={filteredData} />
                    </div>
                </motion.div>
            </main>
        </>
    )
}

export default page