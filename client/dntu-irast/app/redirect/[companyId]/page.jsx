'use client';
import Redirect from "@/components/Redirect";
import mockdata from '@/mockdata.json'

function page({ params }) {
    const filteredData = mockdata.filter((data) => data.id.toString() === params.companyId.toString()).shift()
    return (
        <Redirect data={filteredData} />
    )
}

export default page