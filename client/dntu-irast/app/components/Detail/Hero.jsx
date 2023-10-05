'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineGlobal } from 'react-icons/ai'
import { BsFacebook } from 'react-icons/bs'
import { GoMute, GoUnmute } from 'react-icons/go'
import { FiPlay, FiPause } from 'react-icons/fi'
function Hero({ data: { id, name, contact, address, logo, videoUrl, websiteUrl } }) {
    const [isPlaySound, setIsPlaySound] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const videoRef = useRef(null)

    useEffect(() => {
        const video = videoRef.current
        video?.addEventListener('loadeddata', () => {
            video.play()
        })
    }, [videoRef !== null])

    const handlePlayVideo = () => {
        // Change isPlaying
        setIsPlaying(!isPlaying)
        const video = videoRef.current
        if (video.paused) {
            video.play()
        } else {
            video.pause()
        }
    }

    const handlePlaySound = () => {
        // Change playsound
        const video = videoRef.current
        if (video.muted) {
            video.muted = false // Unmute
        } else {
            video.muted = true
        }
        setIsPlaySound(!isPlaySound)
    }

    return (
        <>
            <div className="_video flex items-center justify-center relative w-full h-[220px] md:h-[calc(100vh-80px)] md:w-screen">
                <div className="absolute bottom-5 right-8 z-50 flex items-center justify-center gap-2">
                    {
                        !isPlaying ?
                            (
                                <FiPause
                                    size={30}
                                    onClick={handlePlayVideo}
                                    className="cursor-pointer text-red-primary" />
                            ) :
                            (
                                <FiPlay
                                    size={30}
                                    onClick={handlePlayVideo}
                                    className="cursor-pointer text-red-primary" />
                            )

                    }
                    {!isPlaySound ? (
                        <GoMute
                            size={30}
                            onClick={handlePlaySound}
                            className="cursor-pointer text-red-primary" />
                    ) :
                        (<GoUnmute
                            size={30}
                            onClick={handlePlaySound}
                            className="cursor-pointer text-red-primary" />
                        )
                    }

                </div>
                <div className="absolute top-0 left-0 opacity-30 bg-gradient-to-b from-black to-gray-500 z-10 w-full h-full"></div>
                <div className="w-[90%] lg:w-[80%] shadow-md h-[150px] lg:h-auto absolute -bottom-[8.25rem] flex flex-row items-start gap-2 lg:gap-8 z-20 bg-slate-50 rounded-[15px] px-2 lg:px-8 py-2">
                    <div className="_left flex-start">
                        <Image src={logo}
                            width={150}
                            height={150}
                            className="rounded-[50%] shadow-lg"
                        />
                    </div>
                    <div className="_right flex flex-col gap-2 lg:gap-4 lg:py-4">
                        <h3 className="font-bold text-red-primary text-xs lg:text-xl">{name}</h3>
                        <p className="font-medium text-gray-400 text-xs lg:text-lg">{contact}</p>
                        <p className="font-medium text-gray-400 text-xs lg:text-lg">{address}</p>
                        <div className="flex flex-row gap-2 items-center w-full h-full lg:py-2">
                            <Link target='_blank' href="http://cohafood.vn" className="text-sm text-black hover:text-blue-400">
                                <AiOutlineGlobal size={20} />
                            </Link>
                            <Link target='_blank' href="https://www.facebook.com/thuphamcohafood?mibextid=ZbWKwL" className="text-sm text-black hover:text-blue-400">
                                <BsFacebook size={20} />
                            </Link>
                        </div>


                    </div>
                </div>
                {
                    id === 1 ?
                        (
                            <video
                                ref={videoRef}
                                controls={false}
                                autoPlay
                                loop
                                muted
                                className="w-full h-full object-cover"
                            >
                                <source src={`${videoUrl}`} type='video/mp4' />
                            </video>
                        ) :
                        (
                            id !== 8 && (
                                <iframe
                                    className="w-full h-full object-cover"
                                    src={`${videoUrl}?autoplay=1&mute=1&loop=1&controls=0`}
                                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                            )
                        )
                }
            </div>
        </>
    )
}

export default Hero