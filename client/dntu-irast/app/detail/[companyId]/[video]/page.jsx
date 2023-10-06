'use client';
import React from 'react'
import mockdata from '@/app/mockdata.json';
import Video from '@/app/components/Detail/Video';

function page({ params }) {
    const { video } = params
    const filteredData = mockdata.filter(data => data.id.toString() === video.toString()).shift();
    return (
        <>
            <main>
                <Video data={filteredData} />
            </main>
        </>
    )
}

export default page