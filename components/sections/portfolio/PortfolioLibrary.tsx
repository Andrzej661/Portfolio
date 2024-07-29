import React from "react"
import PortfolioContainer from "./PortfolioContainer"
import screenShot1 from "@/public/PersonalSite.png"
import screenShot2 from "@/public/EmailSite.png"

const PortfolioLibrary = () => {
  return (
    <>
      <div className=" mx-auto mb-20 inline-block text-center text-4xl font-bold">
        Personal projects
      </div>
      <div className="mb-40">
        <PortfolioContainer
          title={"Email template sender"}
          subtitle={`After creating account and loging in user can 
          upload .zip file. Where it will be extracted
           for html file and imgs, then it uploads 
           images to AWSS3 bucket and change local 
           img paths to urls in HTML file. It saves 
           email templates as projects that can be
            edited in live editor and stored in personal
             library. When ready user can send email to 
             one or more persons.`}
          tech="React, TypeScript, Vite, Nest.js, TailwindCSS, PostgreSQL, Prisma, AWSS3"
          imgSrc={screenShot2}
        />
        <PortfolioContainer
          title={"Personal site"}
          subtitle={"Simple representive website with some animations"}
          tech="React, TypeScript, Next.js, TailwindCSS, Framer motion, Three.js"
          imgSrc={screenShot1}
        />
      </div>
    </>
  )
}

export default PortfolioLibrary
