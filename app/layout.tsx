import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/MUI/Navbar";
import Footer from "@/components/layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KCD DHAKA",
  description: "Kubernetes Community Dhaka Bngladesh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <ToastContainer />
        <Footer />

        {/* ----------google analytics---------- */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-X0V0S469ZL"
        ></Script>
        <Script id="google-analytics">
          {` 
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments)}
         gtag('js', new Date());
         
         gtag('config', 'G-X0V0S469ZL')`}
        </Script>
      </body>
    </html>
  );
}
