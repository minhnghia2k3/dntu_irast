"use client";
import Detail from '@/components/Detail/Detail';
import { GET_ALL_COMPANY_PRODUCT, GET_PRODUCT_BY_ID } from '@/utils/ApiRoutes'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const page = ({ params }) => {
    const [product, setProduct] = useState("")
    const [allCompanyProducts, setAllCompanyProducts] = useState([])
    useEffect(() => {
        const productById = async (productId) => {
            const { data } = await axios.get(`${GET_PRODUCT_BY_ID}${productId}`)
            setProduct(data)
        }
        productById(params.id);
    }, [])
    useEffect(() => {
        const getAllCompanyProducts = async (companyId) => {
            const { data } = await axios.get(`${GET_ALL_COMPANY_PRODUCT}${companyId}`)
            setAllCompanyProducts(data)
        }
        if (product)
            getAllCompanyProducts(product.data.id)
    }, [product])

    return (
        <main className="bg-slate-100 min-h-screen">
            <Detail data={product?.data} allProducts={allCompanyProducts?.data} />
        </main>

    )
}

export default page