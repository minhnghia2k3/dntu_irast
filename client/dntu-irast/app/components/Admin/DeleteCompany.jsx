import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import axios from 'axios'
import { DELETE_COMPANY_ROUTE } from '@/utils/ApiRoutes'
function DeleteCompany({ selectedCompany, isOpenDeleteModal, setIsOpenDeleteModal }) {
    const handleDelete = async () => {
        try {
            const res = await axios.put(`${DELETE_COMPANY_ROUTE}?company_id=${selectedCompany.company_id}`)
            if (res.status === 200) {
                setIsOpenDeleteModal(false)
                window.location.reload()
            }

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            {
                isOpenDeleteModal && (
                    <div id="deleteModal" tabindex="-1" aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                                <button onClick={() => setIsOpenDeleteModal(false)} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <AiOutlineDelete size={50} className="text-red-500 mx-auto" />
                                <p className="mb-4 text-gray-500 dark:text-gray-300">Hành động này sẽ ẩn thông tin doanh nghiệp<br />Bạn có chắc chắn?</p>
                                <div className="flex justify-center items-center space-x-4">
                                    <button onClick={() => setIsOpenDeleteModal(false)} className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Hủy</button>
                                    <button onClick={handleDelete} type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">Đồng ý</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    )
}

export default DeleteCompany