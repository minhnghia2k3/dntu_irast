import React, { useEffect, useState } from 'react'

function Search({ data, setResult, originalData }) {
    const [searchTerm, setSearchTerm] = useState('')
    useEffect(() => {
        if (!searchTerm) {
            return setResult(originalData)
        }
        else {
            const result = data.filter(item => {
                return item.company_name.toLowerCase().includes(searchTerm.toLowerCase())
            })
            setResult(result)
        }
    }, [searchTerm])
    return (
        <div className="w-full md:w-1/2">
            <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">Tìm kiếm tên công ty</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="flex">
                        <div className="relative w-full">
                            <input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                type="search"
                                id="search-dropdown"
                                className="block outline-none p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Tìm kiếm tên công ty" required />
                        </div>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default Search