"use client";
import React, { useEffect, useState } from 'react'
import { CREATE_COMPANY_ROUTE, UPDATE_COMPANY_ROUTE, UPLOADS_API } from '@/utils/ApiRoutes.js'
import { AiOutlineClose } from 'react-icons/ai'
import { PiUploadSimpleBold } from 'react-icons/pi'
import { IoIosRemove } from 'react-icons/io';
import Image from 'next/image';
import axios from 'axios';
function UpdateCompany({ selectedCompany, isOpenEditModal, setIsOpenEditModal }) {
    if (!selectedCompany) return
    const [companyName, setCompanyName] = useState(selectedCompany.company_name)
    const [companyIndex, setCompanyIndex] = useState(selectedCompany.company_index)
    const [logo, setLogo] = useState(selectedCompany.logo)
    const [videoBanner, setVideoBanner] = useState(selectedCompany.video_banner)
    const [gmail, setGmail] = useState(selectedCompany.gmail)
    const [address, setAddress] = useState(selectedCompany.address)
    const [phoneNumber, setPhoneNumber] = useState(selectedCompany.phone)
    const [websiteURL, setWebsiteURL] = useState(selectedCompany.websiteURL)
    const [description, setDescription] = useState(selectedCompany.description)

    // Reset form when modal is closed
    useEffect(() => {
        setCompanyName(selectedCompany.company_name)
        setCompanyIndex(selectedCompany.company_index)
        setGmail(selectedCompany.gmail)
        setAddress(selectedCompany.address)
        setPhoneNumber(selectedCompany.phone)
        setWebsiteURL(selectedCompany.websiteURL)
        setDescription(selectedCompany.description)
        setLogo(selectedCompany.logo)
        setVideoBanner(selectedCompany.video_banner)
    }, [selectedCompany])

    const handleChangeImage = (e) => {
        const file = e.target.files[0]
        if (file) {
            setLogo(file)
        }
    }

    const handleVideoChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setVideoBanner(file)
        }
    }
    const handleSubmitForm = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('company_name', companyName)
        formData.append('company_index', companyIndex)
        formData.append('logo', logo)
        formData.append('video_banner', videoBanner)
        formData.append('gmail', gmail)
        formData.append('address', address)
        formData.append('phone', phoneNumber)
        formData.append('websiteURL', websiteURL)
        formData.append('description', description)

        try {
            const res = await axios.put(`${UPDATE_COMPANY_ROUTE}?company_id=${selectedCompany.company_id}`, formData)
            if (res.status === 200) {
                alert(res.data.errMessage)
                setIsOpenEditModal(false)
                window.location.reload()
            } else {
                alert(res.data.errMessage)
            }
        } catch (err) {
            console.log(err)
        }

    }
    return (
        isOpenEditModal && (
            <div id="product-modal" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <div className="flex gap-4 items-center justify-center">
                                <h3 className="text-lg font-semibold  text-red-700 dark:text-red-700">Sửa thông tin doanh nghiệp</h3>
                            </div>

                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <AiOutlineClose size={20} onClick={() => setIsOpenEditModal(false)} />
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form action="#">
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên doanh nghiệp</label>
                                    <input
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nhập tên doanh nghiệp" required="" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số thứ tự ưu tiên</label>
                                    <input
                                        value={companyIndex}
                                        onChange={(e) => setCompanyIndex(e.target.value)}
                                        type="number"
                                        className="bg-red-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nhập số thứ tự ưu tiên ( 1 - 9999 )" required="" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gmail</label>
                                    <input
                                        value={gmail}
                                        onChange={(e) => setGmail(e.target.value)}
                                        type="gmail"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nhập địa chỉ doanh nghiệp" required="" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
                                    <input
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nhập địa chỉ doanh nghiệp" required="" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại</label>
                                    <input
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        type="text"
                                        maxLength="12"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nhập số điện thoại" required="" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website liên kết</label>
                                    <input
                                        value={websiteURL}
                                        onChange={(e) => setWebsiteURL(e.target.value)}
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="company.com" required="" />
                                </div>
                                <div className="relative flex items-center justify-center h-40 w-40 border-2 border-dashed border-gray-300 rounded-lg">
                                    <label htmlFor="imageInput" className="cursor-pointer flex items-center justify-center w-full h-full relative">
                                        {
                                            typeof logo === "string" ? (
                                                <Image alt="logo" src={`${UPLOADS_API}/${logo}`} width={150} height={150} />
                                            ) : (
                                                <Image alt="logo" src={URL.createObjectURL(logo)} width={150} height={150} />
                                            )
                                        }
                                        <input
                                            onChange={(e) => handleChangeImage(e)}
                                            type="file"
                                            id="imageInput"
                                            className="hidden"
                                            accept="image/*" />
                                    </label>
                                </div>

                                <div className="flex items-center justify-center h-40 w-40 border-2 border-dashed border-gray-300 rounded-lg">
                                    <label className="cursor-pointer">
                                        <div className="text-center">
                                            {typeof videoBanner === "string" ? (
                                                <video src={`${UPLOADS_API}/${videoBanner}`} width={150} height={150} />
                                            ) : (
                                                <video src={URL.createObjectURL(videoBanner)} width={150} height={150} />
                                            )
                                            }
                                        </div>
                                        <input
                                            type="file"
                                            id="videoInput"
                                            className="hidden"
                                            accept="video/*"
                                            onChange={(e) => handleVideoChange(e)}
                                        />
                                    </label>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        id="description"
                                        rows="4"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Mô tả về sản phẩm của công ty">
                                    </textarea>
                                </div>

                            </div>
                            <button onClick={(e) => handleSubmitForm(e)} type="submit" className="flex items-center justify-center text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                Sửa thông tin
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    )
}
export default UpdateCompany