import React from 'react'

function Description({ data: { description } }) {
    return (
        <div className='overflow-x-hidden overflow-y-auto flex flex-col items-center justify-center h-fit min-h-[100px] max-h-[200px] mt-8 bg-white rounded-[15px] shadow px-2 gap-4'>
            {/* Description */}
            <h1 className="text-xl sm:text-2xl font-semibold border-b border-red-primary">Giới thiệu</h1>
            {/* <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" /> */}
            <p className="text-center">{description}</p>
        </div>
    )
}

export default Description