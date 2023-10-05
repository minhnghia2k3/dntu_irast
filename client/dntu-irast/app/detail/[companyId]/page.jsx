'use client';
import Container from '@/app/components/Detail/Container'
import Hero from '@/app/components/Detail/Hero'
import Images from '@/app/components/Detail/Images'
import React from 'react'
import mockdata from '@/app/mockdata.json'

function page({ params }) {
    const filteredData = mockdata.filter((data) => data.id.toString() === params.companyId.toString()).shift()
    return (
        <>
            <Hero data={filteredData} />
            <Container data={filteredData} />
            <Images data={filteredData} />
        </>
    )
}

export default page