"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/navbar";
import { ToastContainer } from "react-toastify";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppRouterCacheProvider>
          <QueryClientProvider client={queryClient}>
            <ToastContainer />
            <Navbar />
            {children}
          </QueryClientProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
