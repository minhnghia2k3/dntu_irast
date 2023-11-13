"use client";
import Detail from '@/components/Detail/Detail';
import { GET_ALL_COMPANY_PRODUCT } from '@/utils/ApiRoutes'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const page = ({ params }) => {
    const [product, setProduct] = useState([])
    useEffect(() => {
        const companyProduct = async () => {
            const { data } = await axios.get(`${GET_ALL_COMPANY_PRODUCT}${params.id}`)
            setProduct(data)
        }
        // TODO: we've got the companyProduct -> find data by productId, find data by companyId
    }, [])
    return (
        <Detail data={data} />
    )
}

export default page