import React from 'react'

function Description({ data: { description } }) {
    return (
        <div className='flex flex-col items-center justify-center w-full h-fit min-h-[100px] mt-8 bg-white rounded-[15px] shadow px-6 py-4 gap-4'>
            <hr className="w-[80%] h-[5px] mx-8 bg-red-800"></hr>
            {/* Description */}
            <p className="flex items-center justify-center text-center md:max-w-[70%]">{description}</p>
        </div>
    )
}

export default Description