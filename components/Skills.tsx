import React from "react"
import { animate, motion } from "framer-motion"
const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "React",
  "Next.js",
  "Nest.js",
  "Tailwind",
  "Sass",
  "Framer Motion",
  "AWSS3",
  "postgreSQL",
  "MongoDb",
  "Prisma",
  "Git",
  "MJML",
  "Ai prompts"
]

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index
    }
  })
}

const Skills = () => {
  return (
    <div className="mb-20 text-center ">
      <div className="mb-8 text-4xl"> My Skills</div>
      <ul className="flex max-w-3xl flex-wrap justify-center gap-2 text-xl ">
        {skillsData.map((skill, index) => (
          <motion.li
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={index}
            className="rounded-xl 
        bg-gradient px-5 py-3"
            key={index}
          >
            {skill}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

export default Skills
