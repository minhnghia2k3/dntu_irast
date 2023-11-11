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
import { products } from '@/constants/items';
const Detail = ({ data, company }) => {
    ;
    return (
        <>
            <section className="w-full bg-slate-100 flex items-center justify-center">
                <div className="flex items-center justify-center px-16 sm:px-32 py-6">
                    <div className="flex flex-col sm:grid sm:grid-cols-2 bg-white rounded-[32px] drop-shadow-lg max-w-4xl min-h-[20rem] items-start">
                        <Image src={products[0].image} alt="Main product" width={580} height={580} className="rounded-b-[32px] sm:rounded-l-[32px]" />
                        <div className="col-span-1 h-full flex flex-col items-start px-6 pt-4">
                            <div className="flex flex-col sm:flex-row w-full items-center justify-between gap-2 sm:gap-0">
                                <div className="flex flex-col sm:flex-row items-center justify-center space-x-2 gap-2 sm:gap-0">
                                    <Image src={products[0].company.logo} alt="Logo" width={48} height={48} />
                                    <p className="text-gray-400 text-xs">{products[0].company.name}</p>
                                </div>
                                <Link href={products[0].company.websiteUrl} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 px-2 rounded">
                                    Contact
                                </Link>
                            </div>
                            <div className="flex flex-col items-start mt-4 max-h-[400px] markdown-scroll">
                                <h2 className="text-lg font-semibold">{products[0].name}</h2>
                                <hr className="w-full h-[2px] text-gray-500 mb-4" />

                                <p className="text-sm font-normal text-gray-400" dangerouslySetInnerHTML={{ __html: products[0].markdown }} />
                                <p className="text-sm font-normal text-gray-400" dangerouslySetInnerHTML={{ __html: products[0].markdown }} />
                                <p className="text-sm font-normal text-gray-400" dangerouslySetInnerHTML={{ __html: products[0].markdown }} />
                                <p className="text-sm font-normal text-gray-400" dangerouslySetInnerHTML={{ __html: products[0].markdown }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full bg-slate-100">
                <p className="font-bold text-black text-center text-lg">Khám phá sản phẩm khác</p>
                <div className="w-full p-4 mt-4 grid grid-cols-4 lg:grid-cols-6 justify-center gap-4">
                    {products.map(product => (
                        <div className="flex flex-col items-start gap-2">
                            <Image src={product.image} alt={product.name} width={300} height={300} className="rounded-[32px] object-contain" />
                            <p className="text-sm text-gray-900 font-bold">{product.name}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default Detail