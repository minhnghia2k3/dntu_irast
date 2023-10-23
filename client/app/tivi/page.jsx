import mockdata from '@/app/mockdata.json';
import Mainv2 from "@/components/Homepage/Mainv2";

export default function Home() {
  return (
    <main className="w-screen h-screen md:h-[calc(100vh-80px)] flex flex-col items-center justify-between">
      <Mainv2 data={mockdata} />
    </main>
  )
}