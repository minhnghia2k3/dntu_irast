import { CREATE_PRODUCT_ROUTE } from '@/utils/ApiRoutes'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { PiUploadSimpleBold } from 'react-icons/pi'

const CreateProduct = ({ data, setIsOpenAddModal, setIsOpenAddProduct, isOpenAddProduct }) => {
    const [companyId, setCompanyId] = useState('')
    const [bannerImg, setBannerImg] = useState(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [otherProds, setOtherProds] = useState([])
    const handleOpenAddCompany = () => {
        setIsOpenAddModal(true)
        setIsOpenAddProduct(false)
    }
    const handleOpenProduct = () => {
        setIsOpenAddProduct(false)
        setIsOpenAddProduct(true)
    }

    const handleSelectItems = (e) => {
        setCompanyId(e.target.value)
    }

    // Other products
    const addProduct = () => {
        setOtherProds([...otherProds, { file: null }])
    }

    const removeProduct = (index) => {
        const updatedProds = [...otherProds];
        updatedProds.splice(index, 1);

        setOtherProds(updatedProds);
    }

    const handleOtherProdsChange = (index, e) => {
        const updatedImages = [...otherProds];
        updatedImages[index] = e.target.files[0];

        setOtherProds(updatedImages);
    }

    const handleSubmitForm = async (e) => {
        // check value before submit
        e.preventDefault();
        // console.log(companyId, title, description, bannerImg, otherProds)

        const formData = new FormData();
        formData.append('company_id', companyId)
        formData.append('title', title)
        formData.append('description', description)
        formData.append('banner_img', bannerImg)
        otherProds.forEach((prod, index) => {
            formData.append(`other_products`, prod)
        })

        try {
            const res = await axios.post(`${CREATE_PRODUCT_ROUTE}${companyId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (res.data.errCode === 0) {
                alert(res.data.errMessage)
                setIsOpenAddProduct(false)
                // window.location.reload()
            }
            else {
                console.log(res.data.errMessage)
            }

        } catch (err) {
            console.log(err)
        }
    }
    return (
        isOpenAddProduct && (
            <div id="product-modal" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <div className="flex gap-4 items-center justify-center">
                                <button type="button" onClick={handleOpenAddCompany} className="txt-base font-semibold text-gray-900 dark:text-white px-6 py-1.5 border border-gray-300 rounded-md">Thêm doanh nghiệp</button>
                                <button type="button" onClick={handleOpenProduct} className="text-lg font-semibold text-red-700 dark:text-red-700">Thêm sản phẩm</button>
                            </div>

                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <AiOutlineClose size={20} onClick={() => setIsOpenAddProduct(false)} />
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form action="#">
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div className="col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chọn doanh nghiệp</label>
                                    <select
                                        onChange={(e) => {
                                            handleSelectItems(e)
                                        }}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option disabled selected value="">=== Chọn doanh nghiệp cần thêm sản phẩm ===</option>
                                        {data && data.map((company, index) => (
                                            <option
                                                key={index}
                                                value={company.company_id}>
                                                {company.company_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tiêu đề sản phẩm</label>
                                    <input
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Nhập tiêu đề sản phẩm"
                                        required="" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        id="description"
                                        rows="4"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Mô tả về sản phẩm">
                                    </textarea>
                                </div>

                                <div className="flex flex-col items-center justify-center w-full col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thêm sản phẩm chính</label>
                                    <div class="relative flex items-center justify-center h-40 w-full border-2 border-dashed border-gray-300 rounded-lg">
                                        <label className="cursor-pointer flex items-center justify-center w-full h-full relative">
                                            {
                                                bannerImg ? (
                                                    <>
                                                        <Image src={URL.createObjectURL(bannerImg)} width={150} height={150} />
                                                    </>
                                                ) : (
                                                    <p className="flex items-center justify-center flex-col mb-2 text-sm font-medium text-gray-900 dark:text-white">Thêm banner
                                                        <PiUploadSimpleBold size={50} className="text-gray-600" />
                                                    </p>
                                                )
                                            }
                                            <input
                                                onChange={(e) => setBannerImg(e.target.files[0])}
                                                type="file"
                                                id="imageInput"
                                                class="hidden"
                                                accept="image/*" />
                                        </label>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={addProduct}
                                    className="sm:col-span-2 p-2 bg-primary text-white rounded-full"
                                >
                                    Thêm sản phẩm khác
                                </button>

                                {otherProds.map((image, index) => (
                                    <div key={index} className="col-span-2 relative flex items-center justify-center h-40 w-full border-2 border-dashed border-gray-300 rounded-lg">
                                        <div className="flex items-center space-x-2 mr-2">
                                            {image.file !== null ? (
                                                <Image src={URL.createObjectURL(image)} alt="Uploaded Image" width={150} height={100} />
                                            ) : (
                                                <>
                                                    <label htmlFor={`file-input-${index}`} className="cursor-pointer custom-file-input">
                                                        <PiUploadSimpleBold size={20} className="text-white" />
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id={`file-input-${index}`}
                                                        accept="image/*"
                                                        onChange={(e) => handleOtherProdsChange(index, e)}
                                                        className="hidden"
                                                    />
                                                </>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeProduct(index)}
                                            className="px-4 py-1.5 bg-red-600 text-white rounded-full"
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                ))}


                                <button onClick={(e) => handleSubmitForm(e)} type="button" className="flex items-center justify-center text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                    Tạo sản phẩm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    )
}

export default CreateProduct