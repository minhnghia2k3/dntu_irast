'use client';
import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './styles.css';

// import required modules
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

export default function App({ data }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const handleSwiperSlideChange = () => {
        const currentVideo = document.querySelector('.swiper-slide-active video');
        const nextVideo = document.querySelector('.swiper-slide-next video');
        const prevVideo = document.querySelector('.swiper-slide-prev video');
        if (currentVideo) {
            currentVideo.pause();
            currentVideo.currentTime = 0;
        }
        if (nextVideo) {
            nextVideo.play();
        }
        if (prevVideo) {
            prevVideo.play();
        }
    };

    return (
        <>
            <div className="relative bg-slate-800 w-screen h-[calc(100vh-80px)] p-2">
                {/* <div className='absolute w-full h-full opacity-20 top-0 left-0  z-10'></div> */}
                <Swiper
                    style={{
                        '--swiper-navigation-color': '#8C1515',
                        '--swiper-pagination-color': '#fff',
                    }}
                    loop={true}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    // autoplay={{
                    //     delay: 3500,
                    //     disableOnInteraction: false,
                    // }}
                    modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                    onSlideChange={handleSwiperSlideChange}
                    className="mySwiper2"
                >
                    {data && data.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className="w-full h-full relative">
                                    {/* Background Video */}
                                    <video
                                        controls={false}
                                        autoPlay
                                        loop
                                        muted
                                        className="w-full h-full object-cover"
                                    >
                                        <source src={item.videoUrl} type='video/mp4' />
                                    </video>
                                    {/* Card info */}
                                    <Link href={`/detail/video/${item.id.toString()}`} className="flex flex-row items-center justify-start max-w-[800px] absolute overflow-hidden top-0 left-0 mx-4 my-2 px-4 py-2 gap-4 w-fit h-fit bg-slate-50 rounded-[15px] shadow-md hover:bg-white ease-in-out transition-all">
                                        <div className="!w-[70px] !h-[70px] relative rounded-full">
                                            <Image
                                                src={item.logo}
                                                alt={item.name}
                                                fill
                                                className="shadow rounded-full object-cover" />
                                        </div>

                                        <div className="flex flex-col items-start justify-center">
                                            <h3 className="text-black text-start text-xl drop-shadow line-clamp-1">
                                                {item.name}
                                            </h3>
                                            <div className="flex flex-row">
                                                <span className="shadow inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                                <span className="shadow inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                                <span className="shadow inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                                            </div>
                                        </div>
                                    </Link>

                                </div>
                            </SwiperSlide>
                        )
                    })}

                </Swiper>
                {/* Small Pagination */}
                <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                >
                    {data && data.map((item, index) => (
                        <SwiperSlide key={index}>
                            <video
                                controls={false}
                                autoPlay={false}
                                loop
                                muted
                                className="w-full h-full object-cover"
                            >

                                <source src={item.videoUrl} type='video/mp4' />
                            </video>
                        </SwiperSlide>
                    ))}


                </Swiper>
            </div >
        </>
    );
}
