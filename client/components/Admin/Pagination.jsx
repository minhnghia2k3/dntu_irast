import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function Pagination({ visibleItems, totalItems, itemsPerPage, setResult, setCurrentPageData }) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalItems.length / itemsPerPage)
    const handlePageClick = (page) => {
        setCurrentPage(page)
    }

    const pages = []
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = currentPage * itemsPerPage
        const currentPageData = totalItems.slice(startIndex, endIndex)
        setResult(currentPageData)
        setCurrentPageData(currentPageData)
    }, [currentPage, totalItems])

    return (
        <>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Hiển thị&nbsp;
                <span className="font-semibold text-gray-900 dark:text-white">{visibleItems.length}&nbsp;</span>
                trên&nbsp;
                <span className="font-semibold text-gray-900 dark:text-white">{totalItems.length}</span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
                <li>
                    <button
                        {...(currentPage === 1 ? { disabled: true } : { disabled: false })}
                        onClick={() => handlePageClick(currentPage - 1)}
                        className="disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="sr-only">Previous</span>
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </li>
                {pages.map((page) => (
                    <li key={page}>
                        <a
                            href="#"
                            className={`flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === page ? '!bg-gray-200' : ''}`}
                            onClick={() => handlePageClick(page)}
                        >
                            {page}
                        </a>
                    </li>
                ))}

                <li>
                    <button
                        {...(currentPage === totalPages ? { disabled: true } : { disabled: false })}
                        onClick={() => handlePageClick(currentPage + 1)}
                        className="disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="sr-only">Next</span>
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </li>
            </ul>
        </>
    )
}

export default Pagination