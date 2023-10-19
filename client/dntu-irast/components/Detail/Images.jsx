import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { UPLOADS_API } from '@/utils/ApiRoutes';


function Images({ data: { images } }) {
    console.log('images: ', images)
    return (
        <>
            {images && images?.map((item, index) => (
                <div key={index} className={`flex flex-col items-center justify-center`}>
                    <div className={`flex ${index % 2 === 0 ? 'flex-row-reverse text-start' : 'flex-row text-end'} items-start justify-start w-full h-full bg-white rounded-[15px] px-2 py-2 shadow gap-4`}>
                        <div className="w-[70%] h-[150px] md:h-[300px] lg:h-[500px] relative">
                            <Image
                                src={`${UPLOADS_API}/${item.image_src}`}
                                alt={item.image_description}
                                fill
                                className="cursor-pointer rounded-[.5rem] shadow opacity-90 hover:opacity-100 transition-opacity duration-300"
                            />
                        </div>

                        <div className={`text-sm md:text-lg font-normal max-w-[30%] h-full p-2`}>
                            <p>{item.image_description}</p>
                        </div>
                    </div>
                </div >
            ))
            }
            <div className="flex flex-col items-center justify-center bg-white rounded-[15px] shadow py-4">
                <p className={`text-red-primary text-xl md:text-2xl font-normal`}>
                    Sản phẩm của chúng tôi
                </p>
                <Swiper
                    slidesPerView={3}
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
                    loop={true}
                    modules={[Navigation, Autoplay]}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    className="w-full h-full">
                    <SwiperSlide>
                        <Image src={'/banner.jpg'} alt="" width={1000} height={200} className="rounded-[1rem] p-2" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={'/banner.jpg'} alt="" width={1000} height={200} className="rounded-[1rem] p-2" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={'/banner.jpg'} alt="" width={1000} height={200} className="rounded-[1rem] p-2" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={'/banner.jpg'} alt="" width={1000} height={200} className="rounded-[1rem] p-2" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={'/banner.jpg'} alt="" width={1000} height={200} className="rounded-[1rem] p-2" />
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className={`flex w-full h-full bg-white rounded-[15px] px-2 py-2 shadow gap-4`}>
                <Map />
            </div>

        </>
    )
}

function Map() {
    return (
        <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.762981105237!2d106.85043379999999!3d10.905609300000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174df1b85b09b1f%3A0xd25922dd76a3040f!2zR08hIEJpZ0MgxJDhu5NuZyBOYWk!5e0!3m2!1svi!2s!4v1696584290853!5m2!1svi!2s"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
        ></iframe>
    );
}

export default Images
