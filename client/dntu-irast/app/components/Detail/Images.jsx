'use client';
import Image from 'next/image'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

function Images({ data: { images } }) {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full lg:px-16 px-8 py-4 relative bg-slate-100 gap-2">
            {images && images.map((item, index) => (
                <Image
                    key={index}
                    alt="Product images"
                    width={500}
                    height={500}
                    className="p-4 rounded-lg shadow-lg w-full h-full"
                    src={item}
                />
            ))}


        </div>
        //     <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        //     <SwiperSlide>Slide 1</SwiperSlide>
        //     <SwiperSlide>Slide 2</SwiperSlide>
        //     <SwiperSlide>Slide 3</SwiperSlide>
        //     <SwiperSlide>Slide 4</SwiperSlide>
        //     <SwiperSlide>Slide 5</SwiperSlide>
        //     <SwiperSlide>Slide 6</SwiperSlide>
        //     <SwiperSlide>Slide 7</SwiperSlide>
        //     <SwiperSlide>Slide 8</SwiperSlide>
        //     <SwiperSlide>Slide 9</SwiperSlide>
        // </Swiper>
    )
}

export default Images