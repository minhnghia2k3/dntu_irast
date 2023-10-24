import React, { useEffect, useState } from 'react'
import { CREATE_COMPANY_ROUTE } from '@/utils/ApiRoutes.js'
import { AiOutlineClose } from 'react-icons/ai'
import { PiUploadSimpleBold } from 'react-icons/pi'
import { useRouter } from 'next/navigation'
import axios from 'axios';
import Image from 'next/image';
function CreateCompany({ isOpenModal, setIsOpenModal }) {
    const [logo, setLogo] = useState(null);
    const [video, setVideo] = useState(null);
    const [companyName, setCompanyName] = useState(null);
    const [email, setEmail] = useState(null);
    const [address, setAddress] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [websiteURL, setWebsiteURL] = useState(null);
    const [description, setDescription] = useState(null);
    const router = useRouter();
    // Handle add website image fields
    const handleChangeImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogo(file)
        }
    }

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideo(file)
        }

    };

    const handleSubmitForm = async (e) => {
        // Upload to server
        e.preventDefault();

        const formData = new FormData();
        formData.append('company_name', companyName);
        formData.append('gmail', email);
        formData.append('logo', logo);
        formData.append('video_banner', video)
        formData.append('address', address);
        formData.append('phone', phoneNumber);
        formData.append('websiteURL', websiteURL);
        formData.append('description', description);
        try {
            const response = await axios.post(CREATE_COMPANY_ROUTE, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.errCode == 0) {
                console.log('Upload successful');
            } else {
                alert('Upload failed' + response.data.errMessage);
            }
            setIsOpenModal(false);
            router.reload();
        } catch (error) {
            console.error('Upload failed', error);
        }

    }
    return (
        <>
            {
                isOpenModal && (
                    <div id="product-modal" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div className="relative p-4 w-full max-w-2xl max-h-full">
                            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Thêm doanh nghiệp</h3>
                                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                        <AiOutlineClose size={20} onClick={() => setIsOpenModal(false)} />
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
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                            <input
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                type="email"
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
                                        <div className="col-span-2">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website liên kết</label>
                                            <input
                                                value={websiteURL}
                                                onChange={(e) => setWebsiteURL(e.target.value)}
                                                type="text"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="company.com" required="" />
                                        </div>
                                        <div class="relative flex items-center justify-center h-40 w-40 border-2 border-dashed border-gray-300 rounded-lg">
                                            <label for="imageInput" className="cursor-pointer flex items-center justify-center w-full h-full relative">
                                                {
                                                    logo ? (
                                                        <Image src={URL.createObjectURL(logo)} width={150} height={150} />
                                                    ) : (
                                                        <PiUploadSimpleBold size={50} className="text-gray-600" />
                                                    )
                                                }
                                                <input
                                                    onChange={(e) => handleChangeImage(e)}
                                                    type="file"
                                                    id="imageInput"
                                                    class="hidden"
                                                    accept="image/*" />
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-center h-40 w-40 border-2 border-dashed border-gray-300 rounded-lg">
                                            <label className="cursor-pointer">
                                                <div className="text-center">
                                                    {video ? (
                                                        <video controls src={URL.createObjectURL(video)} width={150} height={150} />
                                                    )
                                                        : (
                                                            <PiUploadSimpleBold size={50} className="text-gray-600" />
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
                                        Tạo doanh nghiệp
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default CreateCompany