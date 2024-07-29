import React, { useRef } from "react"
import Photos from "./Photos"
import { Button } from "@nextui-org/react"
import { GithubIcon } from "@/components/icons"
import { StaticImageData } from "next/image"
import { useScroll } from "framer-motion"
import { motion, useTransform } from "framer-motion"
type PortfolioContainerProps = {
  title: string
  subtitle: string
  tech: string
  imgSrc: StaticImageData
}

const PortfolioContainer: React.FC<PortfolioContainerProps> = ({
  title,
  subtitle,
  tech,
  imgSrc
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1 1"]
  })
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1])

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: scrollYProgress
      }}
      className="mb-16 flex rounded-xl
     rounded-b-none border-b-0 border-foreground bg-gradient-to-b from-gradient  px-2 pt-2"
    >
      <div
        className="grid gap-8
     rounded-xl rounded-t-none border-b-0 border-foreground bg-gradient-to-t   from-gradient"
      >
        <div className="max-w-4xl">
          <Photos imgSrc={imgSrc} />
        </div>
        <div className="mx-auto flex w-full max-w-3xl flex-col justify-center px-4 xl:px-0">
          <div className="px-2 py-4 text-3xl font-semibold">{title}</div>
          <div className="  px-2 text-xl ">{subtitle}</div>
          <div className="mt-4 px-2   text-xl font-bold ">{tech}</div>
          <Button
            variant="ghost"
            size="lg"
            className=" mx-auto my-10  border-foreground px-5 leading-3 text-foreground"
          >
            Git
            <GithubIcon className="text-foreground" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default PortfolioContainer
