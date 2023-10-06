'use client';
import React from 'react'
import mockdata from '@/app/mockdata.json';
import Video from '@/app/components/Detail/Video';

function page({ params }) {
    const [, secondParams] = params.video || [];
    const filteredData = mockdata.filter(data => data.id.toString() === secondParams.toString()).shift();
    console.log('filter data', filteredData)
    return (
        <>
            <Video data={filteredData} />
        </>
    )
}

export default page