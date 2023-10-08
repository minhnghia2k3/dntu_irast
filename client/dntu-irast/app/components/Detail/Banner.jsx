import React from 'react'
import Image from 'next/image'
import InfoCard from '../InfoCard'

function Banner({ data }) {
    return (
        <>
            <div className="relative w-screen h-[50vh] flex items-center justify-center">
                <Image
                    src={'/banner.jpg'}
                    fill
                    alt=""
                />
                <InfoCard data={data} detailPage={true} />
            </div>
        </>
    )
}

export default Banner