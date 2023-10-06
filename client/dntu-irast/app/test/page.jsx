'use client';
import { useState, useEffect, useRef } from "react";

const PictureInPicture = ({ videoSrc }) => {
    const videoRef = useRef(null);
    const [isPictureInPictureActive, setIsPictureInPictureActive] = useState(false);

    const handlePictureInPicture = async () => {
        try {
            await videoRef.current.requestPictureInPicture();
            setIsPictureInPictureActive(true);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight) {
                setIsPictureInPictureActive(true);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={`relative`}>
            <video
                ref={videoRef}
                src={`https://baodongnai.com.vn/file/video/e7837c02876411cd0187645a2551379f/media/videos/202305/74823_c__fakepath_th__tr__ng_n_o_cho_s_n_ph_m_ocop_.mp4`}
                className={`w-full h-full object-cover`}
                controls={!isPictureInPictureActive}
            />
            {isPictureInPictureActive ? (
                <button
                    onClick={() => {
                        document.exitPictureInPicture();
                        setIsPictureInPictureActive(false);
                    }}
                    className={`absolute top-2 right-2 p-2 bg-white rounded-full shadow-md`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 14l6-4-6-4v8z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </button>
            ) : (
                <button
                    onClick={handlePictureInPicture}
                    className={`absolute top-2 right-2 p-2 bg-white rounded-full shadow-md`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 14l-6-4v8M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
                        />
                    </svg>
                </button>
            )}
            <div className="w-screen h-screen bg-red-800"></div>
        </div>

    );
};

export default PictureInPicture;
