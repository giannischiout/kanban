import type { Metadata } from "next";
import {Roboto_Mono, Inter } from "next/font/google";
import "./globals.css";
import {TooltipProvider} from "@/components/ui/tooltip";



const interFont = Inter({
  variable: "--inter",
  subsets: ["latin", "greek"],
  weight: ["200", "300", "400", "500", "600", "700"]
})

const robotoMono = Roboto_Mono({
  variable: "--roboto",
  subsets: ["latin", ],
  weight: ["200", "300", "400", "500", "700"]
})



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interFont.variable} ${robotoMono.variable} font-inter antialiased`}>
      <TooltipProvider>
        {children}
      </TooltipProvider>
      </body>
    </html>
  );
}
