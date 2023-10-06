'use client';
import Container from '@/app/components/Detail/Container'
import Hero from '@/app/components/Detail/Hero'
import Images from '@/app/components/Detail/Images'
import React from 'react'
import mockdata from '@/app/mockdata.json'
import { motion } from 'framer-motion';

function page({ params }) {
    const [companyId] = params.companyId || [];
    const filteredData = mockdata.filter((data) => data.id.toString() === params.companyId.toString()).shift()
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Container data={filteredData} />
                <Images data={filteredData} />
            </motion.div>
        </>
    )
}

export default page