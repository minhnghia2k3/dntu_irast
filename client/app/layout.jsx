import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header.jsx'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'IRAST - VIỆN NGHIÊN CỨU VÀ ỨNG DỤNG KHOA HỌC CÔNG NGHỆ',
  description: 'Viện nghiên cứu và ứng dụng khoa học công nghệ IRAST - Trường Đại học Công Nghệ Đồng Nai',
}

export default function RootLayout({
  children
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/logo_dntu.png" />
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        <Header />
        {children}
      </body>
    </html >
  )
}
