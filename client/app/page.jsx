"use client";
import Main from "@/components/Homepage/Main";
import { GET_ALL_COMPANIES_ROUTE, GET_PRODUCT } from '@/utils/ApiRoutes.js';
import { useState } from "react";
import axios, { all } from "axios";
export default function Home() {
  const [allCompanies, setAllCompanies] = useState([])
  useState(() => {
    // Get all companies
    const getAllCompanies = async () => {
      try {
        const res = await axios.get(GET_ALL_COMPANIES_ROUTE)
        if (res.data.errCode !== 0) return console.log(res.data.message)
        setAllCompanies(res.data.data)
      } catch (err) {
        console.log(err)
      }
    }
    getAllCompanies();
  }, [])
  console.log('all companies: ', allCompanies)
  return (
    <main className="w-screen h-screen md:h-[calc(100vh-80px)] flex flex-col items-center justify-between">
      <Main data={allCompanies} />
    </main>
  )
}
