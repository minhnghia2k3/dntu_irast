import { UPLOADS_API } from '@/utils/ApiRoutes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function PreviewCompany({ selectedCompany, isOpenPreviewModal, setIsOpenPreviewModal }) {
    console.log('selectedCompany', selectedCompany)
    return (
        <>
            {isOpenPreviewModal && (
                <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-xl max-h-full">
                        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                            <div className="flex justify-between mb-4 rounded-t sm:mb-5">
                                <div className="text-lg text-gray-900 md:text-xl dark:text-white">
                                    <h3 className="font-semibold ">{selectedCompany.company_name}</h3>
                                    <p className="font-bold">{selectedCompany.phone} - {selectedCompany.address}</p>
                                </div>
                                <div>
                                    <button onClick={() => setIsOpenPreviewModal(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="readProductModal">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                            </div>
                            <dl>
                                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Mô tả</dt>
                                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{selectedCompany.description}</dd>
                                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Website liên kết</dt>
                                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400"><Link target='_blank' className='text-blue-500 underline' href={`//${selectedCompany.websiteURL}`}>{selectedCompany.websiteURL}</Link></dd>
                                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Hình ảnh</dt>
                                <dd className="grid grid-cols-2 mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                                    {selectedCompany.images.map((image, index) => {
                                        return (
                                            <div key={index} className="col-span-2 mb-2 flex flex-row items-start justify-start gap-2">
                                                <Image alt={selectedCompany.company_name} src={`${UPLOADS_API}/${image.image_src}`} width={150} height={150} />
                                                <p>{image.image_description}</p>
                                            </div>
                                        )
                                    })}
                                </dd>
                                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Video</dt>
                                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                                    <video controls className="w-full" src={`${UPLOADS_API}/${selectedCompany.videos[0].video_src}`} />
                                </dd>
                                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Trạng thái</dt>
                                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                                    {
                                        selectedCompany.isDeleted === 1 ?
                                            (
                                                <p className="text-red-500 text-lg">Đã ẩn</p>
                                            ) :
                                            (
                                                <p className="text-green-500 text-lg">Hiển thị</p>
                                            )
                                    }
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default PreviewCompany