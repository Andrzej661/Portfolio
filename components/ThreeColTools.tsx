import React from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Columnv2tsx from "./sections/columnv2"
import { PiFigmaLogo, PiGlobeHemisphereWestFill } from "react-icons/pi"
import { IoMdMailUnread } from "react-icons/io"
export const ThreeColTools = () => {
  // Define the initial animation state and the animation for when the columns are in view
  const columnVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1, // Each element will have a delay based on its order
        duration: 0.2
      }
    })
  }

  // This setup will animate each column individually as it comes into view
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <div className="flex flex-col justify-center md:mb-20">
      <div className="mx-auto mb-20  text-center text-4xl font-bold sm:text-left">
        My time saving tools
      </div>
      <div className="flex   justify-center">
        <div className="grid grid-cols-1 justify-center gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          <motion.div
            ref={ref1}
            variants={columnVariants}
            initial="hidden"
            animate={inView1 ? "visible" : "hidden"}
            custom={1} // Custom delay multiplier
          >
            <Columnv2tsx
              title={"Figma plugin"}
              subtitle={`Encoding in diffrent languages is time consuming and it's easy to make a mistake, 
                so i develop a plugin that gather all text from figma design and outputs formated data`}
              Icon={PiFigmaLogo}
            />
          </motion.div>
          <motion.div
            ref={ref2}
            variants={columnVariants}
            initial="hidden"
            animate={inView2 ? "visible" : "hidden"}
            custom={2} // Custom delay multiplier
          >
            <Columnv2tsx
              title={"Language changer"}
              subtitle={
                "Delivering websites for foregin markets fast and without mistakes is quite challenging. I encoded an application that changes text and links in HTML, for those one provided in text files"
              }
              Icon={PiGlobeHemisphereWestFill}
            />
          </motion.div>
          <motion.div
            ref={ref3}
            className="max-w-1/2 col-span-1 md:col-span-2 lg:col-span-1"
            variants={columnVariants}
            initial="hidden"
            animate={inView3 ? "visible" : "hidden"}
            custom={3} // Custom delay multiplier
          >
            <Columnv2tsx
              title={"Mailings with MJML"}
              subtitle={
                "Development Mailing Templates in HTML using tables consumes a lot of time and it's complicated. I use MJML markup language. This way i'm able to deliver quality and reliable mailings"
              }
              Icon={IoMdMailUnread}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// className="md:col-span-2 md:flex md:justify-center lg:col-span-1 lg:block"
export default ThreeColTools
