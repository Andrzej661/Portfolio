import React from "react"
import { IconType } from "react-icons"

type ColumnProps = {
  title: string
  subtitle: string
  Icon: IconType
}

const Column: React.FC<ColumnProps> = ({ title, subtitle, Icon }) => {
  return (
    <div
      className="my-10  flex flex-col items-center justify-center rounded-xl
     rounded-b-none border-b-0 border-foreground bg-gradient-to-b from-gradient pb-8 text-foreground  md:pb-20"
    >
      <div className="p-8 text-center text-3xl lg:p-6  ">
        <Icon className=" mx-auto mb-4" width={30} />

        <div className="mx-auto mb-4 w-3/4 border-b-1 border-foreground pb-4">
          {title}
        </div>
        <div className="max-w-sm text-xl">{subtitle}</div>
      </div>
    </div>
  )
}

export default Column
