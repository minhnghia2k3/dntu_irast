'use client';
import Redirect from "@/app/components/Redirect";
import mockdata from '@/app/mockdata.json'

function page({ params }) {
    const filteredData = mockdata.filter((data) => data.id.toString() === params.companyId.toString()).shift()
    return (
        <Redirect data={filteredData} />
    )
}

export default page