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
    return (
        <>
            <section className="w-full bg-slate-100 flex items-center justify-center">
                <div className="flex items-center justify-center px-32 py-6">
                    <div className="grid grid-cols-2 grid-flow-row bg-white rounded-[32px] drop-shadow-lg max-w-4xl min-h-[20rem] items-start">
                        <Image src={product?.image} alt="Main product" width={800} height={800} className="rounded-l-[32px] object-cover" />
                        <div className="col-span-1 h-full flex flex-col items-start px-6 pt-4">
                            <div className="flex flex-row w-full items-center justify-between">
                                <Link href={product?.websiteUrl || "#"} target='_blank' className="flex items-center space-x-2">
                                    <Image src={product?.logo} alt="Logo" width={48} height={48} />
                                    <p className="font-medium text-gray-400 text-xs">{product?.name}</p>
                                </Link>
                                <Link href={`https://zalo.me/${product?.phone}`} target="_blank" className="bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 px-2 rounded">
                                    Contact
                                </Link>
                            </div>
                            <div className="flex flex-col items-start mt-4 max-h-[400px] markdown-scroll">
                                <h2 className="text-lg font-semibold">{product?.product_name}</h2>
                                <hr className="w-full h-[2px] text-gray-500 mb-4" />

                                <p className="text-sm font-normal text-gray-400" dangerouslySetInnerHTML={{ __html: product?.markdown }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full bg-slate-100">
                <p className="font-bold text-black text-center text-lg">Khám phá sản phẩm khác</p>
                <div className="w-full p-4 mt-4 grid grid-cols-4 lg:grid-cols-6 justify-center gap-4">
                    {allProducts && allProducts?.map(product => (
                        <div key={product.product_id} className="flex flex-col items-start gap-2">
                            <Link href={`/detail/${product.product_id}`}>
                                <Image src={product.image} alt={product.product_name} width={300} height={300} className="rounded-[32px] object-contain" />
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