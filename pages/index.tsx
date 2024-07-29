"use client"

import DefaultLayout from "@/layouts/default"
import { Hero } from "@/components/sections/hero"
import { FourColumns } from "@/components/sections/FourColumns"
import ParticlesBackground from "@/components/particlesBackground"
import PortfolioLibrary from "@/components/sections/portfolio/PortfolioLibrary"
import JobExperiance from "@/components/sections/JobExperiance"
import ContactContainer from "@/components/ContactContainer"
import Skills from "@/components/Skills"
import ThreeColTools from "@/components/ThreeColTools"
export default function IndexPage() {
  return (
    <DefaultLayout>
      <ParticlesBackground>
        <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-center px-2 sm:px-6">
          <Hero />
          <FourColumns />
          <Skills />
          <JobExperiance />
          <PortfolioLibrary />
          <ThreeColTools />
          <ContactContainer />
        </div>
      </ParticlesBackground>
    </DefaultLayout>
  )
}
