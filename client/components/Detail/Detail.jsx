import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { UPLOADS_API } from '@/utils/ApiRoutes';
import Link from 'next/link';

const Detail = ({ data, company }) => {
    const [otherProducts, setOtherProducts] = useState([]);
    console.log('data: ', data)
    useEffect(() => {
        if (data.length === 0) return;

        const other_products = JSON.parse(data[0].other_products);
        setOtherProducts(other_products);
    }, [data]);

    const websiteURL = company && company.websiteURL || "";
    return (
        <>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#8C1515',
                    '--swiper-pagination-color': '#8C1515',
                    '--swiper-navigation-size': '20px'
                }}
                navigation={true}
                // autoplay={{
                //     delay: 3500,
                //     disableOnInteraction: false,
                // }}
                modules={[Navigation, Autoplay]}
                className="!h-[400px] sm:!h-[60%]">
                {data && data.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex items-center justify-center w-full md:px-16 px-2 py-8 gap-4 bg-gray-200 h-full">
                            <div className="flex flex-col items-center justify-center w-full h-full sm:px-8 xl:px-16">
                                <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-red-primary">{item.title}</h1>
                                <p className="mb-6 text-sm font-normal text-gray-500 lg:text-sm px-2 sm:px-8 xl:px-10 dark:text-gray-400">{item.description}</p>
                            </div>
                            <div className="flex sm:hidden relative items-center">
                                <Image
                                    src={`${UPLOADS_API}/${item.banner_img}`}
                                    width={350}
                                    height={350}
                                    alt="Main product"
                                    className="z-10 drop-shadow-2xl" />
                            </div>
                            <div className="hidden sm:flex relative items-center">
                                <Image
                                    src={`${UPLOADS_API}/${item.banner_img}`}
                                    width={650}
                                    height={650}
                                    alt="Main product"
                                    className="z-10 drop-shadow-2xl" />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="w-full max-h-full md:h-[40%] my-4 px-16 flex flex-col items-center justify-center">
                <h1 className="mb-4 text-xl font-extrabold leading-none tracking-tight md:text-2xl lg:text-3xl text-red-primary">Sản phẩm khác</h1>
                <div className="hidden sm:flex items-center justify-center my-2 gap-16">
                    {otherProducts && otherProducts.map((item, index) => (
                        <Link href={websiteURL} target='_blank' key={index} className="cursor-pointer relative bg-gray-200 hover:bg-gray-400 transition-all ease-in-out duration-300 items-center justify-center rounded-full w-[200px] h-[200px] p-4">
                            <Image
                                src={`${UPLOADS_API}/${item}`}
                                fill
                                alt="other product"
                                className="object-contain p-4 rounded-full" />
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                        </Link>

                    ))}
                </div>

                <div className="sm:hidden flex flex-col items-center justify-center my-8 gap-16">
                    {otherProducts && otherProducts.map((item, index) => (
                        <Link href={websiteURL} target='_blank' key={index} className="cursor-pointer relative bg-gray-200 hover:bg-gray-400 transition-all ease-in-out duration-300 items-center justify-center rounded-full w-[150px] h-[150px] p-4">
                            <Image
                                src={`${UPLOADS_API}/${item}`}
                                fill
                                alt="other product"
                                className="object-contain p-4 rounded-full" />
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                        </Link>

                    ))}
                </div>
            </div>
        </>
    )
}

export default Detail