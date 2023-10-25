"use client";

import Detail from "@/components/Detail/Detail";
import Footer from "@/components/Footer";
import { GET_ALL_COMPANIES_ROUTE, GET_ALL_COMPANY_PRODUCT } from "@/utils/ApiRoutes";
import axios from "axios";
import { useEffect, useState } from "react";

function page({ params }) {
    const [allProducts, setAllProducts] = useState([])
    const [company, setCompany] = useState({})
    const { companyId } = params
    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const { data } = await axios.get(`${GET_ALL_COMPANY_PRODUCT}${companyId}`)
                if (data.errCode === 0) {
                    setAllProducts(data.data)
                }
            } catch (err) {
                console.log(err)
            }
        }
        const getCompany = async () => {
            try {
                const { data } = await axios.get(`${GET_ALL_COMPANIES_ROUTE}?company_id=${companyId}`)
                if (data.errCode === 0) {
                    setCompany(data.data?.shift())
                }
            } catch (err) {
                console.log(err)
            }
        }
        getCompany();
        getAllProducts();
    }, [])
    return (
        <>
            <main className="w-full h-[calc(100vh-80px)] bg-slate-100">
                <Detail data={allProducts} company={company} />
            </main>
            <Footer data={company} />
        </>
    )
}

export default page