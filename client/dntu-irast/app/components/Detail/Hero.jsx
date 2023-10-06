'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineGlobal } from 'react-icons/ai'
import { BsFacebook, BsFillPipFill } from 'react-icons/bs'
import { GoMute, GoUnmute } from 'react-icons/go'
import { MdFullscreen } from 'react-icons/md'
import { FiPlay, FiPause } from 'react-icons/fi'
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

function Hero({ data: { id, name, contact, address, logo, videoUrl, websiteUrl } }) {
    const router = useRouter()
    const [isPlaySound, setIsPlaySound] = useState(false)
    const [isPlaying, setIsPlaying] = useState(true)
    const [isPictureInPicture, setIsPictureInPicture] = useState(false)
    const videoRef = useRef(null)

    /* Handle Video Player */
    const handlePlayVideo = () => {
        // Change isPlaying
        setIsPlaying(!isPlaying)
        const video = videoRef.current
        if (!isPlaying) {
            video.play()
        } else {
            video.pause()
        }
    }

    const handlePlaySound = () => {
        // Change playsound
        const video = videoRef.current
        if (!isPlaySound) {
            video.muted = false // Unmute
        } else {
            video.muted = true
        }
        setIsPlaySound(!isPlaySound)
    }

    /* Handle picture in picture */
    useEffect(() => {
        const video = videoRef.current
        video.addEventListener('leavepictureinpicture', () => {
            setIsPictureInPicture(false)
            router.push(`/detail/video/${id}`)
        })
        if (isPictureInPicture) {
            router.push(`/detail/${id}`)
        }
        return () => {
            video.removeEventListener('leavepictureinpicture', () => {
                setIsPictureInPicture(false)
                router.push(`/detail/video/${id}`)
            })
        }
    }, [isPictureInPicture])

    const handlePictureInPicture = async () => {
        try {
            await videoRef.current.requestPictureInPicture();
            setIsPictureInPicture(true)
        } catch (err) {
            console.log(err)
        }
    }

    const handleFullScreen = () => {
        const video = videoRef.current
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    }
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="_video flex items-center justify-center relative w-full h-[220px] md:h-[calc(100vh-80px)] md:w-screen"
            >
                {/* Group of buttons for controlling video */}
                <div className="absolute bottom-5 left-8 z-50 flex items-center justify-center gap-4 text-white">
                    {
                        !isPlaying ?
                            (
                                <FiPlay
                                    size={30}
                                    onClick={handlePlayVideo}
                                    className="cursor-pointer" />
                            ) :
                            (
                                <FiPause
                                    size={30}
                                    onClick={handlePlayVideo}
                                    className="cursor-pointer" />
                            )

                    }
                    {!isPlaySound ? (
                        <GoMute
                            size={30}
                            onClick={handlePlaySound}
                            className="cursor-pointer" />
                    ) :
                        (<GoUnmute
                            size={30}
                            onClick={handlePlaySound}
                            className="cursor-pointer" />
                        )
                    }

                </div>
                {/* Group of buttons for screen video */}
                <div className="absolute bottom-5 right-8 z-50 flex items-center justify-center gap-4 text-white">
                    <div
                        onClick={handlePictureInPicture}
                        className={`p-2 cursor-pointer rounded-full shadow-md z-50`} >
                        <BsFillPipFill
                            size={25}
                            onClick={handlePlayVideo}
                            className="cursor-pointer" />
                    </div>
                    <MdFullscreen
                        size={30}
                        onClick={handleFullScreen}
                        className="cursor-pointer" />
                </div>
                {/* Company info */}
                <div className="overflow-hidden w-[90%] lg:w-[80%] shadow-md h-[150px] lg:h-auto absolute top-[25px] flex flex-row items-start gap-2 lg:gap-8 z-20 bg-slate-50 rounded-[15px] px-2 lg:px-8 py-2 opacity-10 hover:opacity-100 transition-opacity ease-in-out duration-300">
                    <Link href={`/detail/${id}`} className="w-full h-full flex flex-row items-center justify-start lg:gap-8 gap-4">
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
                                {/* <Link target='_blank' href="http://cohafood.vn" className="text-sm text-black hover:text-blue-400">
                                    <AiOutlineGlobal size={20} />
                                </Link>
                                <Link target='_blank' href="https://www.facebook.com/thuphamcohafood?mibextid=ZbWKwL" className="text-sm text-black hover:text-blue-400">
                                    <BsFacebook size={20} />
                                </Link> */}
                            </div>
                        </div>
                    </Link>
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
                                <source src={videoUrl} type='video/mp4' />
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
            </motion.div>
        </>
    )
}
export default Hero



