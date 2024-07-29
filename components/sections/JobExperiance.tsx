import React from "react"

const Banner = () => {
  return (
    <div className="mb-40 mt-20 flex w-full flex-col items-center  justify-center border-y-1 p-4  py-8 lg:my-48 lg:py-20 ">
      <div className="grid grid-cols-1 place-items-center items-center gap-8 lg:grid-cols-3 lg:gap-12 ">
        <div className="">
          <div className="pb-2 text-3xl font-bold">They.pl</div>
          <div className=" text-medium font-light tracking-widest">
            marketing agency
          </div>
          <div className=" pb-4 text-medium font-bold tracking-widest ">
            <div className="inline  font-black text-primary">Frontend</div>{" "}
            Developer
          </div>
          <div className=" text-medium font-light tracking-widest">
            09.2022 - 09.2023
          </div>
        </div>

        <div className="max-w-2xl pl-2 text-xl lg:col-span-2  lg:pl-0">
          <div className="pb-2 font-bold">Responsibilities:</div>
          <ul className="list-disc">
            <li>
              <b>Frontend</b> website development
            </li>
            <li>
              Encoding <b>HTML</b> email templates
            </li>
            <li>
              Encoding product pages with <b>strict</b>&nbsp;criteria
            </li>
            <li>
              Prepering websites for&nbsp;<b>multinational</b>&nbsp;projects.
              Ive encounter trouble with copy text of so many languages, so i
              wrote script that did it for me
            </li>
          </ul>
          <div className="pt-2">
            I&apos;ve accomplished to deliver<b> high&nbsp;quality</b> code on{" "}
            <b>time</b>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
