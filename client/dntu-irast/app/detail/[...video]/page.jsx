'use client';
import React from 'react'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import mockdata from '@/app/mockdata.json';
import Hero from '@/app/components/Detail/Hero';

function page({ params }) {
    const [, secondParams] = params.video || [];
    const filteredData = mockdata.filter(data => data.id.toString() === secondParams.toString()).shift();
    return (
        <>
            <Hero data={filteredData} />
        </>
    )
}

export default page