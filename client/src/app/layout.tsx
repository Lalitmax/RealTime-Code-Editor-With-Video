import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Codemax",
  description: "A tool that combines live code editing with video chat, enabling real-time collaboration and communication between developers.",
  icons: {
    icon: "/favicon.ico",  
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} >

        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
         
        </ThemeProvider> */}
        {<StoreProvider>
          <Navbar></Navbar>
          {children}
        </StoreProvider>
        }

      </body>
    </html>
  );
}
