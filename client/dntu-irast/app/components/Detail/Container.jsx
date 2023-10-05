"use client";
import React from 'react'
function Container({ data }) {
    return (
        <>
            <div className="mt-36 w-screen h-full flex flex-col items-center justify-center px-8 py-4">
                <div className="w-[90%] lg:w-[80%] h-[2px] bg-red-800"></div>
                <div className="w-[90%] lg:w-[80%] text-start">
                    <p className="font-medium text-black">{data.description}</p>
                </div>
            </div>
        </>
    )
}

export default Container