import React, { useEffect, useState } from 'react'
import { GET_ALL_COMPANIES_ROUTE, UPLOADS_API } from '@/utils/ApiRoutes.js'
import axios from 'axios'
import Image from 'next/image';
import { FiMoreHorizontal } from 'react-icons/fi'
import CreateCompany from './CreateCompany';
import UpdateCompany from './UpdateCompany';
import DeleteCompany from './DeleteCompany';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import RestoreCompany from './RestoreCompany';
import PreviewCompany from './PreviewCompany';
import Search from './Search';
import Filter from './Filter';
function Admin() {
    const [companies, setCompanies] = useState([]);
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isOpenRestoreModal, setIsOpenRestoreModal] = useState(false);
    const [isOpenPreviewModal, setIsOpenPreviewModal] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    // Handle toggle modal product
    const handleAddModal = () => {
        setIsOpenAddModal(!isOpenAddModal)
    }
    useEffect(() => {
        const getAllData = async () => {
            const res = await axios.get(GET_ALL_COMPANIES_ROUTE)
            if (res.status === 200) {
                setCompanies(res.data)
            }
        }
        getAllData()
    }, [])

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased w-screen h-screen">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <Search data={companies} />
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button type="button" onClick={handleAddModal} className="flex items-center justify-center text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                    <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                    </svg>
                                    Thêm doanh nghiệp
                                </button>
                                <div className="flex items-center space-x-3 w-full md:w-auto">
                                    <Filter />
                                    <div id="filterDropdown" className="z-10 hidden w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                                        <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Category</h6>
                                        <ul className="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                                            <li className="flex items-center">
                                                <input id="apple" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label for="apple" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Apple (56)</label>
                                            </li>
                                            <li className="flex items-center">
                                                <input id="fitbit" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label for="fitbit" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Fitbit (56)</label>
                                            </li>
                                            <li className="flex items-center">
                                                <input id="dell" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label for="dell" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Dell (56)</label>
                                            </li>
                                            <li className="flex items-center">
                                                <input id="asus" type="checkbox" value="" checked="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label for="asus" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Asus (97)</label>
                                            </li>
                                            <li className="flex items-center">
                                                <input id="logitech" type="checkbox" value="" checked="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label for="logitech" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Logitech (97)</label>
                                            </li>
                                            <li className="flex items-center">
                                                <input id="msi" type="checkbox" value="" checked="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label for="msi" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">MSI (97)</label>
                                            </li>
                                            <li className="flex items-center">
                                                <input id="bosch" type="checkbox" value="" checked="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label for="bosch" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Bosch (176)</label>
                                            </li>
                                            <li className="flex items-center">
                                                <input id="sony" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label for="sony" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Sony (234)</label>
                                            </li>
                                            <li className="flex items-center">
                                                <input id="samsung" type="checkbox" value="" checked="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label for="samsung" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Samsung (76)</label>
                                            </li>
                                            <li className="flex items-center">
                                                <input id="canon" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label for="canon" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Canon (49)</label>
                                            </li>
                                            <li className="flex items-center">
                                                <input id="microsoft" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label for="microsoft" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Microsoft (45)</label>
                                            </li>
                                            <li className="flex items-center">
                                                <input id="razor" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label for="razor" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Razor (49)</label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-4">#</th>
                                        <th scope="col" className="px-4 py-4">Tên doanh nghiệp</th>
                                        <th scope="col" className="px-4 py-3">Địa chỉ</th>
                                        <th scope="col" className="px-4 py-3">Số điện thoại</th>
                                        <th scope="col" className="px-4 py-3">Mô tả</th>
                                        <th scope="col" className="px-4 py-3">Website liên kết</th>
                                        <th scope="col" className="px-4 py-3">Hình ảnh</th>
                                        <th scope="col" className="px-4 py-3">Video</th>
                                        <th scope="col" className="px-4 py-3">Trạng thái</th>
                                        <th scope="col" className="px-4 py-3">Ngày tạo</th>
                                        <th scope="col" className="px-4 py-3">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {companies && companies.map((company, index) => (
                                        <tr key={index} className="border-b dark:border-gray-700 h-full">
                                            <td scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{company.company_id}</td>
                                            <td scope="row" className="max-w-[8rem] truncate px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{company.company_name}</td>
                                            <td className="max-w-[8rem] truncate px-4 py-3">{company.address}</td>
                                            <td className="px-4 py-3">{company.phone}</td>
                                            <td className="px-4 py-3 max-w-[8rem] truncate">{company.description}</td>
                                            <td className="max-w-[8rem] truncate px-4 py-3">
                                                <a target='_blank' href={company.websiteURL ? `//${company.websiteURL}` : ""} className="text-blue-500">{company.websiteURL}</a>
                                            </td>
                                            <td className="px-4 py-3 flex items-center justify-center flex-col">
                                                {company.images && company.images.map((image, index) => (
                                                    // if length > 3 show 3 images ... else < 3 show all
                                                    index < 1 ?
                                                        <Image key={index} alt={image.description} src={`${UPLOADS_API}/${image.image_src}`} width={50} height={50} className="mb-2" /> :
                                                        (index > 2 ? <button><FiMoreHorizontal /></button> : (null))
                                                ))}
                                            </td>
                                            <td className="px-4 py-3">
                                                {company.videos && company.videos.map((video, index) => (
                                                    index < 1 ?
                                                        <video key={index} alt={video.description} src={`${UPLOADS_API}/${video.video_src}`} width={50} height={50} className="mb-2" /> :
                                                        (index > 1 ? <button><FiMoreHorizontal /></button> : (null))
                                                ))}
                                            </td>
                                            <td className={`px-4 py-3 ${company.isDeleted === 1 ? 'text-red-500' : 'text-green-500'}`}>{company.isDeleted === 1 ? 'Đã ẩn' : 'Hiển thị'}</td>
                                            <td className="px-4 py-3">{company.createdAt}</td>
                                            <td className="px-4 py-3">
                                                <Dropdown>
                                                    <DropdownTrigger>
                                                        <Button variant="bordered">
                                                            <FiMoreHorizontal size={20} onClick={() => setSelectedCompany(company)} />
                                                        </Button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu aria-label="Static Actions" className="bg-gray-700 px-2 py-4 text-white w-40 rounded-sm">
                                                        <DropdownItem onClick={() => setIsOpenEditModal(true)} key="edit" className="focus:outline-none hover:bg-gray-800 text-white">
                                                            Chỉnh sửa
                                                        </DropdownItem>
                                                        <DropdownItem onClick={() => setIsOpenPreviewModal(true)} key="preview" className="focus:outline-none hover:bg-gray-800 text-white">
                                                            Xem trước
                                                        </DropdownItem>
                                                        {
                                                            company.isDeleted === 0 ?
                                                                (
                                                                    <DropdownItem onClick={() => setIsOpenDeleteModal(true)} key="delete" className="focus:outline-none hover:bg-gray-800 text-red-500" color="danger">
                                                                        Xóa
                                                                    </DropdownItem>
                                                                ) :
                                                                (
                                                                    <DropdownItem onClick={() => setIsOpenRestoreModal(true)} key="delete" className="focus:outline-none hover:bg-gray-800 text-green-500" color="danger">
                                                                        Khôi phục
                                                                    </DropdownItem>
                                                                )
                                                        }

                                                    </DropdownMenu>
                                                </Dropdown>
                                            </td>
                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                Showing
                                <span className="font-semibold text-gray-900 dark:text-white">1-10</span>
                                of
                                <span className="font-semibold text-gray-900 dark:text-white">1000</span>
                            </span>
                            <ul className="inline-flex items-stretch -space-x-px">
                                <li>
                                    <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span className="sr-only">Previous</span>
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                                </li>
                                <li>
                                    <a href="#" aria-current="page" className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span className="sr-only">Next</span>
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
            {/* Create product Modal */}
            <CreateCompany isOpenModal={isOpenAddModal} setIsOpenModal={setIsOpenAddModal} />
            <UpdateCompany selectedCompany={selectedCompany} isOpenEditModal={isOpenEditModal} setIsOpenEditModal={setIsOpenEditModal} />
            <PreviewCompany selectedCompany={selectedCompany} isOpenPreviewModal={isOpenPreviewModal} setIsOpenPreviewModal={setIsOpenPreviewModal} />
            <DeleteCompany selectedCompany={selectedCompany} isOpenDeleteModal={isOpenDeleteModal} setIsOpenDeleteModal={setIsOpenDeleteModal} />
            <RestoreCompany selectedCompany={selectedCompany} isOpenRestoreModal={isOpenRestoreModal} setIsOpenRestoreModal={setIsOpenRestoreModal} />
        </>
    )
}

export default Admin