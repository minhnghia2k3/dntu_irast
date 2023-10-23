'use client';
import React from 'react'
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image';

function Providers({ data }) {
    return (
        <>
            <div className="w-full max-h-fit px-8 2xl:px-56 py-4 bg-slate-100">
                <Swiper
                    spaceBetween={0}
                    modules={[Autoplay, FreeMode, Pagination]}
                    slidesPerView={3}
                    pagination={{
                        dynamicBullets: true,
                    }}
                    speed={3000}
                    freeMode={true}
                    loop={true}
                    centeredSlides={true}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false
                    }}
                    breakpoints={
                        {
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 20
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 0
                            },
                        }
                    }
                >
                    {
                        data && data.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className='px-4 py-8 w-[300px] h-[150px] 2xl:w-full 2xl:h-full rounded-xl shadow flex items-center justify-center bg-white'>
                                    <Image
                                        src={item.logo}
                                        alt="Logo"
                                        width={160}
                                        height={160}
                                        className="2xl:w-[150px] 2xl:h-[150px]"
                                    />
                                </div>
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </div >
        </>
    )
}

export default Providers