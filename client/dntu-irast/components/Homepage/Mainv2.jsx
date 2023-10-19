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
import InfoCard from '../InfoCard';
import { UPLOADS_API } from '@/utils/ApiRoutes';
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
            <div className="relative bg-slate-800 w-screen h-full">
                <Swiper
                    style={{
                        '--swiper-navigation-color': '#fff',
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
                    {data && data?.map((item, index) => {
                        if (item.isDeleted === 0)
                            return (
                                <SwiperSlide key={index}>
                                    <div className="w-full h-full relative">
                                        {
                                            item.videos ? (
                                                <video
                                                    controls={false}
                                                    autoPlay
                                                    loop
                                                    muted
                                                    className="w-full h-full object-fit bg-slate-800 md:object-cover"
                                                >
                                                    <source src={`${UPLOADS_API}/${item?.videos[0]?.video_src}`} type='video/mp4' />
                                                </video>
                                            ) :
                                                (
                                                    <div className="w-full h-full relative">
                                                        <Image src={`/banner.jpg`} alt="" fill className="md:object-cover" />
                                                    </div>

                                                )
                                        }
                                        <InfoCard data={item} showTag={true} navUrl={`/detail/video/${item.company_id}`} />
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
                    {data && data.map((item, index) => {
                        if (item.isDeleted === 0)
                            return (
                                <SwiperSlide key={index} className="rounded-[2px]">
                                    {
                                        item.videos ? (
                                            <video
                                                controls={false}
                                                autoPlay={false}
                                                loop
                                                muted
                                                className="w-full h-full object-cover rounded-[2px]"
                                            >

                                                <source src={`${UPLOADS_API}/${item.videos[0]?.video_src}`} type='video/mp4' />
                                            </video>
                                        ) :
                                            (
                                                <Image src={'/banner.jpg'} alt="" fill />
                                            )
                                    }

                                </SwiperSlide>
                            )
                    })}
                </Swiper>
            </div >
        </>
    );
}
