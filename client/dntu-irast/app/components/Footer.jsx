import React from 'react'
import { CiLocationOn } from "react-icons/ci"
function Footer() {
    return (
        <footer className="flex items-start w-screen h-[400px] bg-red-primary p-10 border-gray-100 drop-shadow">

            <div className="flex flex-col gap-4 w-full">
                <h1 className="font-semibold text-lg lg:text-xl text-gray-300 tracking-wider text-start mb-6">
                    CONG TY COHAFOOD
                </h1>
                <p className="flex gap-2 text-sm text-white text-start">
                    <CiLocationOn size={20} />
                    <span>Địa chỉ</span>
                </p>
                <p className="flex gap-2 text-sm text-white text-start">
                    <CiLocationOn size={20} />
                    <span>Địa chỉ</span>
                </p>
                <p className="flex gap-2 text-sm text-white text-start">
                    <CiLocationOn size={20} />
                    <span>Địa chỉ</span>
                </p>

            </div>
            <div>
                <h1 className="font-semibold text-lg lg:text-xl text-gray-300 tracking-wider text-start mb-6">
                    CONG TY COHAFOOD
                </h1>
            </div>
            <div>
                <h1 className="font-semibold text-lg lg:text-xl text-gray-300 tracking-wider text-start mb-6">
                    CONG TY COHAFOOD
                </h1>
            </div>

        </footer>
    )
}

export default Footer