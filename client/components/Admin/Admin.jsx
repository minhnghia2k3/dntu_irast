"use client";
import React, { useEffect, useState } from 'react'
import { DETAIL_ROUTE, GET_ACCESSING_REPORT, GET_ALL_COMPANIES_ROUTE, GET_ALL_COMPANY_PRODUCT, GET_PRODUCT_BY_ID, UPLOADS_API } from '@/utils/ApiRoutes.js'
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
import Pagination from './Pagination';
import CreateProduct from './CreateProduct';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Link from 'next/link';
import FileSaver from 'file-saver';

function Admin() {
    const [companies, setCompanies] = useState([]);
    const [products, setProducts] = useState([]);

    const [isLogged, setIsLogged] = useState('logged');
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isOpenRestoreModal, setIsOpenRestoreModal] = useState(false);
    const [isOpenPreviewModal, setIsOpenPreviewModal] = useState(false);
    const [isOpenAddProduct, setIsOpenAddProduct] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [currentPageData, setCurrentPageData] = useState([]);
    const [result, setResult] = useState("");

    // Handle toggle modal product
    const handleAddModal = () => {
        setIsOpenAddModal(!isOpenAddModal)
    }

    useEffect(() => {
        const getAllCompanies = async () => {
            const res = await axios.get(GET_ALL_COMPANIES_ROUTE)
            if (res.status === 200) {
                setCompanies(res.data.data)
            }
        }
        getAllCompanies()

    }, [])

    useEffect(() => {
        const getAllProducts = async () => {
            const res = await axios.get(`${GET_ALL_COMPANY_PRODUCT}${selectedCompany?.company_id}`)
            if (res.status === 200) {
                setProducts(res?.data.data)
            }
        }
        getAllProducts()
    }, [selectedCompany])

    // Check isLogged in localStorage when component did mount
    useEffect(() => {
        const status = localStorage.getItem('status')
        setIsLogged(status)
    }, [])
    return (
        isLogged === 'logged' ?
            (
                <>
                    <main className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased w-screen h-screen">

                        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                            <Tabs selectedTabClassName='border-b-2'>
                                <TabList className='flex text-white my-2 border-b cursor-pointer border-gray-500'>
                                    <Tab>
                                        <p className='px-4 py-2 rounded-lg hover:bg-gray-800'>Quản lý sản phẩm</p>
                                    </Tab>
                                    <Tab>
                                        <p className="px-4 py-2 rounded-lg hover:bg-gray-800">Báo cáo truy cập</p>
                                    </Tab>
                                </TabList>
                                {/* Product */}
                                <TabPanel>
                                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                                            <Search originalData={currentPageData} data={result} setResult={setResult} />
                                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                                <button type="button" onClick={handleAddModal} className="flex items-center justify-center text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                                    <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                        <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                                    </svg>
                                                    Thêm doanh nghiệp
                                                </button>
                                                <div className="relative flex items-center space-x-3 w-full md:w-auto">
                                                    <Filter originalData={currentPageData} data={result} setResult={setResult} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="overflow-x-scroll">
                                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                    <tr>
                                                        <th scope="col" className="px-4 py-3">#</th>
                                                        <th scope="col" className="px-4 py-3">Đường dẫn QR</th>
                                                        <th scope="col" className="px-4 py-3">Tên doanh nghiệp</th>
                                                        <th scope="col" className="px-4 py-3">Gmail</th>
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
                                                    {result && result.map((company, index) => (
                                                        <tr key={index} className="border-b dark:border-gray-700 h-full">
                                                            <td scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</td>
                                                            <td scope="row" className="px-4 py-3 font-medium whitespace-nowrap text-blue-500">{DETAIL_ROUTE}/{company.company_id}</td>
                                                            <td scope="row" className="relative max-w-[8rem] truncate px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {company.company_name}
                                                                {company.company_index === 1 && <span className="absolute top-2 left-0 text-green-500 ml-2">*</span>}
                                                            </td>
                                                            <td scope="row" className="max-w-[8rem] truncate px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{company.gmail}</td>

                                                            <td className="max-w-[8rem] truncate px-4 py-3">{company.address}</td>
                                                            <td className="px-4 py-3">{company.phone}</td>
                                                            <td className="px-4 py-3 max-w-[8rem] truncate">{company.description}</td>
                                                            <td className="max-w-[8rem] truncate px-4 py-3">
                                                                <a target='_blank' href={company.websiteURL ? `//${company.websiteURL}` : ""} className="text-blue-500">{company.websiteURL}</a>
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                <Image src={`${UPLOADS_API}/${company.logo}`} width={50} height={50} className='rounded-full object-contain' alt="image" />
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                <video src={`${UPLOADS_API}/${company.video_banner}`} width="50" height="50" controls={false} autoPlay={false} />
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
                                                                    <DropdownMenu aria-label="Static Actions" className="bg-gray-200 dark:bg-gray-700 px-2 py-4 dark:text-white text-gray-900 w-40 rounded-sm">
                                                                        <DropdownItem onClick={() => setIsOpenEditModal(true)} key="edit" className="focus:outline-none hover:bg-gray-400 dark:text-white text-gray-900">
                                                                            Chỉnh sửa
                                                                        </DropdownItem>
                                                                        <DropdownItem onClick={() => setIsOpenPreviewModal(true)} key="preview" className="focus:outline-none hover:bg-gray-400 dark:text-white text-gray-900">
                                                                            Xem trước
                                                                        </DropdownItem>
                                                                        {
                                                                            company.isDeleted === 0 ?
                                                                                (
                                                                                    <DropdownItem onClick={() => setIsOpenDeleteModal(true)} key="delete" className="focus:outline-none hover:bg-gray-400 text-red-500" color="danger">
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
                                            <Pagination visibleItems={result} totalItems={companies} setResult={setResult} setCurrentPageData={setCurrentPageData} itemsPerPage={5} />
                                        </nav>
                                    </div>
                                </TabPanel>

                                {/* Report */}
                                <TabPanel>
                                    <div className='flex justify-center items-center h-[200px] text-white border border-white rounded-lg'>
                                        {/* <button onClick={() => {console.log("Hello")}}>Xuất file báo cáo</button> */}
                                        <a href={GET_ACCESSING_REPORT}>
                                            Xuất file báo cáo
                                        </a>
                                    </div>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </main>
                    <CreateCompany isOpenModal={isOpenAddModal} setIsOpenModal={setIsOpenAddModal} setIsOpenProduct={setIsOpenAddProduct} />
                    <UpdateCompany selectedCompany={selectedCompany} isOpenEditModal={isOpenEditModal} setIsOpenEditModal={setIsOpenEditModal} />
                    <PreviewCompany products={products} selectedCompany={selectedCompany} isOpenPreviewModal={isOpenPreviewModal} setIsOpenPreviewModal={setIsOpenPreviewModal} />
                    <DeleteCompany selectedCompany={selectedCompany} isOpenDeleteModal={isOpenDeleteModal} setIsOpenDeleteModal={setIsOpenDeleteModal} />
                    <RestoreCompany selectedCompany={selectedCompany} isOpenRestoreModal={isOpenRestoreModal} setIsOpenRestoreModal={setIsOpenRestoreModal} />
                    <CreateProduct data={companies} setIsOpenAddModal={setIsOpenAddModal} setIsOpenAddProduct={setIsOpenAddProduct} isOpenAddProduct={isOpenAddProduct} />
                </>
            ) :
            (
                <div className="flex items-center justify-center w-screen h-[calc(100vh-80px)]">
                    <h1 className="text-4xl font-semibold text-gray-500">Bạn cần đăng nhập để truy cập vào trang này</h1>
                </div>
            )
    )
}

export default Admin