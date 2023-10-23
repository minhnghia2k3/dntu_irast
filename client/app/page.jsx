"use client";
import Mainv2 from "@/components/Homepage/Mainv2";
import { GET_ALL_COMPANIES_ROUTE } from '@/utils/ApiRoutes.js';
import { useState } from "react";
import axios from "axios";
export default function Home() {
  const [allCompanies, setAllCompanies] = useState([])
  useState(() => {
    // Get all companies
    const getAllCompanies = async () => {
      try {
        const res = await axios.get(GET_ALL_COMPANIES_ROUTE)
        setAllCompanies(res.data.data)
      } catch (err) {
        console.log(err)
      }
    }
    getAllCompanies();
  }, [])
  return (
    <main className="w-screen h-screen md:h-[calc(100vh-80px)] flex flex-col items-center justify-between">
      <Mainv2 data={allCompanies} />
    </main>
  )
}
