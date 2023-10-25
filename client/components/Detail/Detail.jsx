import React, { useEffect } from 'react'
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
    if (data.length === 0) return
    const other_products = JSON.parse(data[0].other_products)
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
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                modules={[Navigation, Autoplay]}
                className="!h-[60%]">
                {data && data.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex items-center justify-center w-full px-32 py-8 gap-4 bg-gray-200 h-full">
                            <div className="flex flex-col items-center justify-center w-full h-full px-8">
                                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-red-primary">{item.title}</h1>
                                <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-8 xl:px-20 dark:text-gray-400">{item.description}</p>
                            </div>
                            <div className="relative flex items-center">
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
            <div className="w-full h-[40%] py-8 px-16">
                <h1 className="font-semibold text-2xl text-center">Sản phẩm khác</h1>
                <div className="flex items-center justify-center my-8 gap-16">
                    {other_products && other_products.map((item, index) => (
                        <Link href={websiteURL} target='_blank' key={index} className="cursor-pointer relative bg-gray-200 hover:bg-gray-400 transition-all ease-in-out duration-300 items-center justify-center rounded-full w-[200px] h-[200px] p-4">
                            <Image
                                src={`${UPLOADS_API}/${item}`}
                                fill
                                alt="other product"
                                className="object-contain p-4 rounded-full" />
                            <span class="relative flex h-3 w-3">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                        </Link>

                    ))}

                </div>
            </div>
        </>
    )
}

export default Detail