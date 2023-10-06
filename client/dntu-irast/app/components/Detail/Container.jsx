"use client";
import React from 'react'
import { motion } from 'framer-motion';

function Container({ data }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="w-screen h-full flex flex-col items-center justify-center px-8 py-4">
                <div className="w-[90%] lg:w-[80%] h-[2px] bg-red-800"></div>
                <div className="w-[90%] lg:w-[80%] text-start">
                    <p className="font-medium text-black">{data.description}</p>
                </div>
            </div>
        </motion.div>
    )
}

export default Container