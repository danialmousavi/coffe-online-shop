import './globals.css'
import { Inter } from 'next/font/google'
import AosInit from '@/utils/Aos';
import ScrollToTop from '@/utils/ScrollToTop';
const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: "صفحه اصلی - SET Coffee | فروشگاه اینترنتی قهوه ست",
  description: "coffee project with next.js v13",

  icons: {
    icon:"/images/favicon.png",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="fa" >
      <body className={inter.className}>
        <AosInit/>
        {children}
        <ScrollToTop/>
        </body>
    </html>
  )
}
