'use client';
import React, { useState } from 'react';
import ReactPlayer from 'react-player/youtube';
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
    const [isPlaying, setIsPlaying] = useState(0);
    const player = [];
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
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
                    autoplay={{
                        delay: 15000,
                        disableOnInteraction: true,
                    }}
                    modules={[Autoplay, FreeMode, Navigation, Thumbs]}
                    onSlideChange={(swiper) => {
                        setIsPlaying(swiper.activeIndex);
                        console.log(isPlaying, swiper.activeIndex);
                    }}
                    className="mySwiper2"
                >
                    {data && data?.map((item, index) => {
                        if (item.isDeleted === 0)
                            return (
                                <SwiperSlide key={index}>
                                    <div className="w-full h-full relative">
                                        <ReactPlayer width="100%" height="100vh"
                                            url={`${item.video}`}
                                            ref={(ref) => {
                                                player[index] = ref;
                                            }}
                                            playing={isPlaying === index ? true : false}
                                            onPause={() => {
                                                player[index].seekTo(0);
                                            }}
                                        />
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
                                <SwiperSlide key={index} className="bg-slate-800">
                                    <div>
                                        <Image src={item.logo} alt={item.name} width={64} height={64} className="object-contain" />
                                    </div>
                                </SwiperSlide>
                            )
                    })}
                </Swiper>
            </div >
        </>
    );
}
