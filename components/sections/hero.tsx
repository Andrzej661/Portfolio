import React, { useState, useEffect } from "react"
import Threedcontainer from "@/components/3d/Threedcontainer"
import { Spacer } from "@nextui-org/react"
import { BsArrow90DegDown, BsArrowRight } from "react-icons/bs"
import { motion, AnimatePresence } from "framer-motion"

export const Hero = () => {
  return (
    <div className="mx-auto mt-20 flex w-full max-w-screen-xl items-center justify-center pb-20 md:mt-10 lg:mt-16 xl:mb-24 xl:mt-24">
      <div className="grid w-full grid-cols-1 lg:grid-cols-3">
        <div className="col-span-1 flex justify-start xl:col-span-4 ">
          <motion.div
            className="text-4xl"
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ type: "linear", duration: 0.5 }}
          >
            {" "}
            <div className="pb-3 pl-1 text-lg tracking-widest">
              {"Let's make the digital world a"}&nbsp;{"better"}&nbsp;{"place"}
            </div>
            <div className="inline font-normal tracking-tighter">
              {"Deliver "}
              <div className="inline text-primary">
                {"best"}&nbsp;{"experiance"}
              </div>
              <br />
              {"with modern approach."}
            </div>
            <Spacer y={4} />
            <div className="pt-2 text-xl">
              <div className="lg:text-center">
                <a
                  className="rounded-2xl text-medium font-bold uppercase tracking-wider"
                  color="white"
                  href="#spellbinding-projects"
                >
                  {"Check out my"}{" "}
                  <div className="inline text-primary">{"work"}</div>
                </a>
                <div className="ml-4 inline-block">
                  <BsArrow90DegDown
                    className="mt-8 inline -scale-x-100 transform"
                    fontSize={40}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="col-span-1 flex h-full min-h-[300px] justify-center sm:max-h-[400px] md:mt-0 md:max-h-[500px] lg:mt-[-10%] xl:col-span-5 xl:mt-0  xl:h-[500px] xl:max-h-none">
          <Threedcontainer />
        </div>
        <motion.div
          className="col-span-1 flex  items-end justify-end pr-2 text-4xl xl:col-span-4"
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "linear", delay: 0.5, duration: 0.5 }} // Adjusted delay to ensure it starts after the left column animation
        >
          <div className=" text-right text-4xl">
            <div className="pb-3 pl-1 text-lg tracking-widest">
              {"Hi! I'm Andrzej"}
            </div>
            <div className="inline font-normal tracking-tighter">
              {"Ambitious Junior"}
              <br />
              <div className="inline text-primary">{"Fullstack"}&nbsp;</div>
              {"Developer"}
            </div>
            <Spacer y={4} />
            <div className="mt-8 flex justify-end text-left">
              <div className="inline pr-3 pt-1">
                <BsArrow90DegDown className="inline" fontSize={40} />
              </div>
              <a
                className="mr-[15%] rounded-2xl text-medium font-bold uppercase tracking-wider"
                color="white"
                href="#spellbinding-projects"
              >
                {" See my "}
                <div className="inline text-primary ">{"Potencial"}</div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
