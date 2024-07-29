import React from "react"
import { IconType } from "react-icons"
import { Button } from "@nextui-org/react"
import { GithubIcon } from "../icons"
type ColumnProps = {
  title: string
  subtitle: string
  Icon: IconType
}

const Columnv2tsx: React.FC<ColumnProps> = ({ title, subtitle, Icon }) => {
  return (
    <div
      className="md:min-w-md mx-auto mb-10 flex max-w-md flex-col  items-center justify-center rounded-xl rounded-b-none border-b-0
     border-foreground bg-gradient-to-b from-gradient pb-8 text-foreground sm:pb-0 md:mb-0  lg:mb-20"
    >
      <div className="p-8 text-center text-3xl lg:p-6  ">
        <Icon className=" mx-auto mb-4" width={30} />

        <div className="mx-auto mb-4  border-b-1 border-foreground pb-4">
          {title}
        </div>
        <div className="max-w-sm text-xl md:min-h-[196px]">{subtitle}</div>
        <Button
          variant="ghost"
          size="lg"
          className=" mx-auto my-10  border-foreground px-5 leading-3 text-foreground"
        >
          Git <GithubIcon className=" text-foreground" />
        </Button>
      </div>
    </div>
  )
}

export default Columnv2tsx
