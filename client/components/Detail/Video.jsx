'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { BsFillPipFill } from 'react-icons/bs'
import { GoMute, GoUnmute } from 'react-icons/go'
import { MdFullscreen } from 'react-icons/md'
import { FiPlay, FiPause } from 'react-icons/fi'
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import InfoCard from '../InfoCard';

function Video({ data, companyProduct }) {
    const router = useRouter()
    const [isPlaySound, setIsPlaySound] = useState(false)
    const [isPlaying, setIsPlaying] = useState(true)
    const [isPictureInPicture, setIsPictureInPicture] = useState(false)
    const videoRef = useRef(null)

    console.log("data: ", data)
    console.log("Company product: ", companyProduct)

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
        video?.addEventListener('leavepictureinpicture', () => {
            setIsPictureInPicture(false)
            router.push(`/detail/video/${companyProduct[0]?.product_id}`)
        })
        if (isPictureInPicture) {
            router.push(`/detail/${companyProduct[0]?.product_id}`)
        }
        return () => {
            video?.removeEventListener('leavepictureinpicture', () => {
                setIsPictureInPicture(false)
                router.push(`/detail/video/${companyProduct[0]?.product_id}`)
            })
        }
    }, [isPictureInPicture, videoRef])

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
                className="_video flex items-center justify-center relative w-full h-screen md:h-[calc(100vh-80px)] md:w-screen"
            >
                {/* Group of buttons for controlling video */}
                {data.id === 0 && (
                    <>
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
                    </>
                )}
                <InfoCard data={data} navUrl={`/detail/${companyProduct[0]?.product_id}`} showTag={false} />
                {
                    data.video && data.id === 1 ? (
                        <video
                            ref={videoRef}
                            controls={false}
                            autoPlay
                            loop
                            muted
                            className="w-full h-full object-fit md:object-cover"
                        >
                            <source src={data.video} type='video/mp4' />
                        </video>
                    ) : (
                        <iframe width="100%" height="100%" src={`${data?.video}?autoplay=1&mute=0&controls=1`} title={data?.name} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    )
                }
            </motion.div>
        </>
    )
}
export default Video



