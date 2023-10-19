import React from 'react'
import Image from 'next/image'

function Banner({ data }) {
    console.log('data from banner: ', data)
    return (
        <>
            <div className="relative w-screen h-[50vh] flex items-center justify-center">
                <Image
                    src={'/banner.jpg'}
                    fill
                    alt=""
                />
            </div>
        </>
    )
}

export default Banner