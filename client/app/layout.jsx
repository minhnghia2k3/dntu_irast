import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header.jsx'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'IRATS - VIỆN NGHIÊN CỨU VÀ ỨNG DỤNG KHOA HỌC CÔNG NGHỆ',
  description: 'Viện nghiên cứu và ứng dụng khoa học công nghệ IRATS - Trường Đại học Công Nghệ Đồng Nai',
}

export default function RootLayout({
  children
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/logo_dntu.png" />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-N64525CG89" />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-N64525CG89');
        `}
        </Script>
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        <Header />
        {children}
      </body>
    </html >
  )
}
