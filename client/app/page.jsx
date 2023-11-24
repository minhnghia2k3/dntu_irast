"use client";
import Main from "@/components/Homepage/Main";
import { GET_ALL_COMPANIES_ROUTE, GET_PRODUCT } from '@/utils/ApiRoutes.js';
import { useEffect, useState } from "react";
import axios from "axios";
export default function Home() {
  const [allCompanies, setAllCompanies] = useState([])
  useEffect(() => {
    const getAllCompanies = async () => {
      const res = await axios.get(GET_ALL_COMPANIES_ROUTE)
      if (!res) return null
      setAllCompanies(res?.data.data)
    }
    getAllCompanies()
  }, [])
  return (
    <main className="w-screen h-screen md:h-[calc(100vh-80px)] flex flex-col items-center justify-between">
      <Main data={allCompanies} />
    </main>
  )
}
