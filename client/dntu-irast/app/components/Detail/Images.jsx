import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Dancing_Script } from 'next/font/google'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const font_style = Dancing_Script({ subsets: ['latin'] })

function Images({ data: { images } }) {
    return (
        <>
            {images && images?.map((item, index) => (
                <div key={index} className={`flex flex-col items-center justify-center`}>
                    <div className={`flex ${index % 2 === 0 ? 'flex-row-reverse text-end' : 'flex-row text-start'} items-center justify-center w-full h-full bg-white rounded-[15px] px-2 py-2 shadow gap-4`}>
                        <div className="w-[800px] h-[150px] md:-[1000px] md:h-[300px] relative">
                            <Image
                                src={item}
                                fill
                                className="cursor-pointer rounded-[.5rem] shadow hover:shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                            />
                        </div>

                        <p className={`${font_style.className} text-lg md:text-2xl font-normal`}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta delectus, nobis saepe totam eum ratione libero, quo nesciunt illum vel qui, unde harum dolorem eligendi modi aliquid debitis sit quaerat.
                        </p>
                    </div>
                </div >
            ))
            }
            <div className="flex flex-col items-center justify-center bg-white rounded-[15px] shadow py-4">
                <p className={`${font_style.className} text-red-primary text-xl md:text-2xl font-normal`}>
                    San phẩm của chúng tôi
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
                        <Image src={'/banner.jpg'} alt="" width={300} height={300} className="rounded-[1rem]" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={'/banner.jpg'} alt="" width={300} height={300} className="rounded-[1rem]" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={'/banner.jpg'} alt="" width={300} height={300} className="rounded-[1rem]" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={'/banner.jpg'} alt="" width={300} height={300} className="rounded-[1rem]" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={'/banner.jpg'} alt="" width={300} height={300} className="rounded-[1rem]" />
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
