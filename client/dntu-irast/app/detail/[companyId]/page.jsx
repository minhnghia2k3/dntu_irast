'use client';
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import axios from 'axios';
import { GET_ALL_COMPANIES_ROUTE } from '@/utils/ApiRoutes';
import Detail from '@/app/components/Detail/Detail';
import Footer from '@/app/components/Footer';
function page({ params }) {

    return (
        <>
            <Detail />
            <Footer />
        </>
    )
}

export default page