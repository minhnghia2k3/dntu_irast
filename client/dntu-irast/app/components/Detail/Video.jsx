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
import InfoCard from '../InfoCard';

function Video({ data: { id, name, contact, address, logo, videoUrl, websiteUrl } }) {
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
                <InfoCard navUrl={`detail/${id}`} logo={logo} companyName={name} contact={contact} address={address} />
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
export default Video



