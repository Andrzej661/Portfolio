"use client"

import { Navbar } from "@/components/Navbar"
import { Head } from "./head"
import Footer from "@/components/Footer"

export default function DefaultLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative mx-auto flex h-screen   max-w-screen-2xl flex-col">
      <Head />
      <Navbar />
      <main className="  mt-10 ">{children}</main>
      <Footer />
    </div>
  )
}
