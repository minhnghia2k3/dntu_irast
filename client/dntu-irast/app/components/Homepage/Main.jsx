'use client';
import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { io } from 'socket.io-client';
import { useRouter } from 'next/navigation';
function Main({ data }) {
    const router = useRouter();
    const handleNavigate = (path) => {
        const socket = io('https://test-socket-api.vercel.app/');

        // Gửi yêu cầu định tuyến bằng Socket.io khi người dùng click
        socket.emit('navigateTo', path);
    };

    useEffect(() => {
        const socket = io('https://test-socket-api.vercel.app/');

        socket.on('redirectTo', (path) => {
            router.push(path); // Điều hướng đến trang được chỉ định
        });

        return () => {
            socket.disconnect(); // Đóng kết nối khi component unmount
        };
    }, []);


    return (
        <>
            <div className="w-screen relative h-[100%] flex flex-row items-center justify-center color-div py-8 px-8 2xl:px-32">
                <div className="swiper-button image-swiper-button-next hover:opacity-20 transition-all ease-in-out">
                    <IoIosArrowForward />
                </div>
                <div className="swiper-button image-swiper-button-prev hover:opacity-20 transition-all ease-in-out">
                    <IoIosArrowBack />
                </div>
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
                    spaceBetween={0}
                    loop={true}
                    navigation={{
                        nextEl: ".image-swiper-button-next",
                        prevEl: ".image-swiper-button-prev",
                    }}
                    modules={[Navigation, Autoplay]}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    className="w-full h-full"
                >
                    {
                        data && data.map((item, index) => (
                            <SwiperSlide key={index} className="main-card !py-2">
                                <Link
                                    onClick={() => handleNavigate(`detail/${item.id}`)}
                                    href={`detail/${item.id}`}
                                    className="card flex flex-col items-center justify-start text-center w-[300px] h-[400px] md:w-[350px] md:h-[400px] 2xl:w-[500px] 2xl:h-[600px] hover:text-[#F7666D] bg-white border-gray-200 rounded-[15px] shadow px-4 py-2 gap-2 cursor-pointer">
                                    <div className="card-image relative w-[140px] h-[140px] 2xl:w-[220px] 2xl:h-[220px]  object-cover">
                                        <Image
                                            src={item.logo}
                                            alt={item.name}
                                            fill
                                            className="border-[3px] border-[#F7666D] rounded-[50%] p-1" />
                                    </div>
                                    <div className="title font-bold text-lg md:text-xl 2xl:text-4xl line-clamp-1">
                                        <h3>{item.name}</h3>
                                    </div>
                                    <div className="description font-medium text-sm text-gray-400 2xl:text-xl line-clamp-2">
                                        <p>{item.description ? item.description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}</p>
                                    </div>
                                    <div className="qrCode relative mt-4 w-[100px] h-[100px] 2xl:w-[200px] 2xl:h-[200px]">
                                        <Image
                                            src={item.qrCode}
                                            alt={item.name}
                                            fill />
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div >
        </>
    )
}

export default Main
