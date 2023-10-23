import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';

function page({ params }) {
    return (
        <section>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#8C1515',
                    '--swiper-pagination-color': '#8C1515',
                    '--swiper-navigation-size': '15px'
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                // autoplay={{
                //     delay: 3500,
                //     disableOnInteraction: false,
                // }}
                modules={[FreeMode, Navigation, Autoplay]}
                className="w-full max-w-full h-[100%]">
                <SwiperSlide className="flex items-center justify-center">
                    <div className="flex items-center justify-between px-8 py-16 gap-4 bg-gray-200">
                        <div className="w-full h-full ">
                            <h1 className="font-semibold text-xl drop-shadow line-clamp-1">Title</h1>
                            <p className="text-sm line-clamp-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt, non? Obcaecati reprehenderit voluptatum dolorum similique tempore? Aperiam quo, velit ullam cumque blanditiis suscipit voluptatum reiciendis distinctio dicta exercitationem temporibus rerum.</p>
                        </div>
                        <div>
                            <Image
                                src="/images/cohafood/cha.png"
                                width={350}
                                height={550}
                                alt="Main product" />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center">
                    <div className="flex items-center justify-between px-8 py-4 gap-4 bg-gray-200">
                        <div className="w-full h-full ">
                            <h1 className="font-semibold text-xl drop-shadow line-clamp-1">Title</h1>
                            <p className="text-sm line-clamp-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt, non? Obcaecati reprehenderit voluptatum dolorum similique tempore? Aperiam quo, velit ullam cumque blanditiis suscipit voluptatum reiciendis distinctio dicta exercitationem temporibus rerum.</p>
                        </div>
                        <div>
                            <Image
                                src="/images/cohafood/cha.png"
                                width={350}
                                height={550}
                                alt="Main product" />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center">
                    <div className="flex items-center justify-between px-8 py-4 gap-4 bg-gray-200">
                        <div className="w-full h-full ">
                            <h1 className="font-semibold text-xl drop-shadow line-clamp-1">Title</h1>
                            <p className="text-sm line-clamp-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt, non? Obcaecati reprehenderit voluptatum dolorum similique tempore? Aperiam quo, velit ullam cumque blanditiis suscipit voluptatum reiciendis distinctio dicta exercitationem temporibus rerum.</p>
                        </div>
                        <div>
                            <Image
                                src="/images/cohafood/cha.png"
                                width={350}
                                height={550}
                                alt="Main product"
                                className="drop-shadow" />
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>

            <div className="flex flex-col items-center justify-center my-4">
                <h1 className="font-bold text-2xl">Sản phẩm liên quan</h1>
            </div>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#8C1515',
                    '--swiper-pagination-color': '#8C1515',
                    '--swiper-navigation-size': '15px'
                }}
                slidesPerView={3}
                spaceBetween={20}
                navigation={true}
                // autoplay={{
                //     delay: 3500,
                //     disableOnInteraction: false,
                // }}
                modules={[FreeMode, Navigation, Autoplay]}
                className="my-8"
            >
                <SwiperSlide >
                    <div className="relative bg-gray-200 items-center justify-center rounded-full w-[150px] h-[150px] p-4">
                        <Image
                            src="/images/cohafood/cha.png"
                            fill
                            alt="Main product"
                            className="object-contain p-4" />
                    </div>
                </SwiperSlide>
                <SwiperSlide >
                    <div className="relative bg-gray-200 items-center justify-center rounded-full w-[150px] h-[150px] p-4">
                        <Image
                            src="/images/cohafood/cha.png"
                            fill
                            alt="Main product"
                            className="object-contain p-4" />
                    </div>
                </SwiperSlide>
                <SwiperSlide >
                    <div className="relative bg-gray-200 items-center justify-center rounded-full w-[150px] h-[150px] p-4">
                        <Image
                            src="/images/cohafood/cha.png"
                            fill
                            alt="Main product"
                            className="object-contain p-4" />
                    </div>
                </SwiperSlide>
                <SwiperSlide >
                    <div className="relative bg-gray-200 items-center justify-center rounded-full w-[150px] h-[150px] p-4">
                        <Image
                            src="/images/cohafood/cha.png"
                            fill
                            alt="Main product"
                            className="object-contain p-4" />
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    )
}

export default page