import React from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Column from "./column"
import { GiTechnoHeart } from "react-icons/gi"
import { LuMonitorSmartphone } from "react-icons/lu"
import { IoPersonCircleSharp } from "react-icons/io5"

export const FourColumns = () => {
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
  const [ref4, inView4] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <div className="flex flex-col md:mb-20">
      <div className="flex items-center justify-center">
        <div className="grid justify-center gap-6 md:grid-cols-2 lg:grid-cols-4 xl:gap-8">
          <motion.div
            ref={ref1}
            variants={columnVariants}
            initial="hidden"
            animate={inView1 ? "visible" : "hidden"}
            custom={1} // Custom delay multiplier
          >
            <Column
              title={"Front-end"}
              subtitle={
                "I love to code! It's fascinating to bring ideas to life and provide memorable experience for users"
              }
              Icon={LuMonitorSmartphone}
            />
          </motion.div>
          <motion.div
            ref={ref2}
            variants={columnVariants}
            initial="hidden"
            animate={inView2 ? "visible" : "hidden"}
            custom={2} // Custom delay multiplier
          >
            <Column
              title={"Learner"}
              subtitle={
                "I'm learning how to deliver seamless connection between client and server side"
              }
              Icon={GiTechnoHeart}
            />
          </motion.div>
          <motion.div
            ref={ref3}
            variants={columnVariants}
            initial="hidden"
            animate={inView3 ? "visible" : "hidden"}
            custom={3} // Custom delay multiplier
          >
            <Column
              title={"Other"}
              subtitle={
                "I consider myself as a jack of all trades. I love to improve and learn new skills. Every challenge is a new opportunity."
              }
              Icon={IoPersonCircleSharp}
            />
          </motion.div>
          <motion.div
            ref={ref4}
            variants={columnVariants}
            initial="hidden"
            animate={inView4 ? "visible" : "hidden"}
            custom={3} // Custom delay multiplier
          >
            <Column
              title={"Other"}
              subtitle={
                "I consider myself as a jack of all trades. I love to improve and learn new skills. Every challenge is a new opportunity."
              }
              Icon={IoPersonCircleSharp}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// className="md:col-span-2 md:flex md:justify-center lg:col-span-1 lg:block"
