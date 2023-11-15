import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { UPLOADS_API } from '@/utils/ApiRoutes';
import Link from 'next/link';
const Detail = ({ data: product, allProducts }) => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <section className="w-full bg-slate-100 flex items-center justify-center">
                <div className="flex items-center justify-center px-8 lg:px-32 py-6">
                    <div className="flex flex-col sm:flex-row bg-white rounded-[32px] shadow-lg max-w-4xl">
                        <Image src={product?.image} alt="Main product" width={800} height={600} className="rounded-[32px] sm:rounded-l-[32px] object-contain w-full sm:w-1/2" />
                        <div className="sm:w-1/2 w-full flex flex-col items-start px-6 pt-4 h-auto mb-4">
                            <div className="flex flex-row items-center justify-between gap-2">
                                <Link href={product?.websiteUrl || "#"} target='_blank' className="flex flex-1 items-center">
                                    <Image src={product?.logo} alt="Logo" width={64} height={64} />
                                    <p className="font-medium text-gray-400 text-xs">{product?.name}</p>
                                </Link>
                                <Link href={`https://zalo.me/${product?.phone}`} target="_blank" className="flex bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 px-2 rounded">
                                    Liên hệ
                                </Link>
                            </div>
                            <div className="flex flex-col items-start mt-4">
                                <h2 className="text-lg font-semibold">{product?.product_name}</h2>
                                <hr className="w-full h-[2px] text-gray-500 mb-4" />

                                <p className="text-sm font-normal text-gray-400 max-h-[400px] markdown-scroll" dangerouslySetInnerHTML={{ __html: product?.markdown }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <section className="w-full bg-slate-100">
                <p className="font-bold text-black text-center text-lg">Khám phá sản phẩm khác</p>
                <div className="flex flex-wrap gap-4 mt-4 justify-center">
                    {allProducts && allProducts?.map(product => (
                        <div key={product.product_id} className="flex flex-col items-start gap-2">
                            <Link href={`/detail/${product.product_id}#`} scroll={false}>
                                <Image src={product.image} alt={product.product_name} width={300} height={300} className="rounded-2xl object-contain shadow hover:shadow-2xl transition-shadow duration-300" />
                            </Link>
                            <p className="text-xs text-gray-700 font-semibold">{product.product_name}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default Detail