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
                    //     delay: 5000,
                    //     disableOnInteraction: true,
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
                                            item.video && index !== 0 ? (
                                                <iframe width="100%" height="100%" src={`${item.video}?autoplay=0&mute=1&controls=0`} title={item.name} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                            ) :
                                                (
                                                    <video
                                                        controls={false}
                                                        autoPlay
                                                        loop
                                                        muted
                                                        className="w-full h-full object-fit bg-slate-800 md:object-cover"
                                                    >
                                                        <source src={item.video} type='video/mp4' />
                                                    </video>
                                                )
                                        }
                                        <InfoCard data={item} showTag={true} navUrl={`/detail/video/${item.id}`} />
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
                    {data && data?.map((item, index) => {
                        if (item.isDeleted === 0)
                            return (
                                <SwiperSlide key={index} >
                                    <div>
                                        <Image src={item.logo} alt={item.name} width={128} height={128} className="object-contain" />
                                    </div>
                                </SwiperSlide>
                            )
                    })}
                </Swiper>
            </div >
        </>
    );
}
