import React, { useEffect, useState } from 'react'
import { CREATE_COMPANY_ROUTE } from '@/utils/ApiRoutes.js'
import { AiOutlineClose } from 'react-icons/ai'
import { PiUploadSimpleBold } from 'react-icons/pi'
import { IoIosRemove } from 'react-icons/io';


function CreateCompany({ isOpenModal, setIsOpenModal }) {
    const [images, setImages] = useState([]);
    const [video, setVideo] = useState([]);
    const [companyName, setCompanyName] = useState(null);
    const [address, setAddress] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [websiteURL, setWebsiteURL] = useState(null);
    const [description, setDescription] = useState(null);

    // Handle add website image fields

    const addImage = () => {
        setImages([...images, { file: null, description: '' }]);
    };

    const removeImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };

    const handleImageChange = (index, e) => {
        const updatedImages = [...images];
        updatedImages[index].file = e.target.files[0];
        setImages(updatedImages);
    };

    const handleDescriptionChange = (index, e) => {
        const updatedImages = [...images];
        updatedImages[index].description = e.target.value;
        setImages(updatedImages);
    };

    const handleVideoChange = (e) => {
        setVideo(e.target.files[0])
    };
    const handleSubmitForm = (e) => {
        // Upload to server
        e.preventDefault();
        const formData = new FormData();
        formData.append('company_name', companyName);
        formData.append('address', address);
        formData.append('phone', phoneNumber);
        formData.append('websiteURL', websiteURL);
        formData.append('description', description);
        formData.append('video_src', video);
        images.forEach((image) => {
            formData.append('image_src', image.file);
            formData.append('image_titles', image.description);
        });

        axios.post(CREATE_COMPANY_ROUTE, formData).then((res) => {
            if (res.status === 200) {
                console.log(res.data);
            }
        }).catch(err => {
            console.log(err)
        })
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
                                        {images.map((image, index) => (
                                            <div key={index} className="sm:col-span-2 w-full">
                                                <div className="flex items-center space-x-2">
                                                    {image.file ? (
                                                        <img src={URL.createObjectURL(image.file)} alt="Uploaded Image" className="w-16 h-16" />
                                                    ) : (
                                                        <>
                                                            <label htmlFor={`file-input-${index}`} className="cursor-pointer custom-file-input">
                                                                <PiUploadSimpleBold size={20} className="text-white" />
                                                            </label>
                                                            <input
                                                                type="file"
                                                                id={`file-input-${index}`}
                                                                accept="image/*"
                                                                onChange={(e) => handleImageChange(index, e)}
                                                                className="hidden"
                                                            />
                                                        </>
                                                    )}

                                                    <textarea
                                                        placeholder='Mô tả về hình ảnh'
                                                        rows="1"
                                                        onChange={(e) => handleDescriptionChange(index, e)}
                                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index)}
                                                        className="p-2 bg-red-500 text-white rounded-full"
                                                    >
                                                        <IoIosRemove size={20} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={addImage}
                                            className="sm:col-span-2 p-2 bg-primary text-white rounded-full"
                                        >
                                            Thêm hình ảnh
                                        </button>

                                        <div className="mb-4 sm:col-span-2 w-full">
                                            <div className="flex items-center space-x-2">
                                                <label htmlFor="video-upload" className="flex items-center justify-center gap-2 cursor-pointer text-white">
                                                    <PiUploadSimpleBold size={20} className="" />
                                                    Thêm video banner
                                                </label>
                                                <input
                                                    type="file"
                                                    id="video-upload"
                                                    accept="video/*"
                                                    onChange={(e) => handleVideoChange(e)}
                                                    className="hidden"
                                                />
                                                {video.length !== 0 && (
                                                    <video controls src={URL.createObjectURL(video)} className="w-64 h-32" />
                                                )}
                                            </div>
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