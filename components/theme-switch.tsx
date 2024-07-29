import { FC, useState, useEffect } from "react"
import { VisuallyHidden } from "@react-aria/visually-hidden"
import { SwitchProps, useSwitch } from "@nextui-org/react"
import { useTheme } from "next-themes"
import clsx from "clsx"

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons"

export interface ThemeSwitchProps {
  className?: string
  classNames?: SwitchProps["classNames"]
  svgSize:number
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
  svgSize
}) => {
  const [isMounted, setIsMounted] = useState(false)

  const { theme, setTheme } = useTheme()

  const onChange = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark")
  }

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps
  } = useSwitch({
    isSelected: theme === "light",
    onChange
  })

  useEffect(() => {
    setIsMounted(true)
  }, [isMounted])

  // Prevent Hydration Mismatch
  if (!isMounted) return <div className="" />

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          "px-px transition-opacity hover:opacity-80 cursor-pointer",
          className,
          classNames?.base
        )
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              "h-auto w-auto",
              "bg-transparent",
              "rounded-lg",
              "flex items-center justify-center",
              "group-data-[selected=true]:bg-transparent",
              "text-foreground",
              "pt-px",
              "px-0",
              "mx-0"
            ],
            classNames?.wrapper
          )
        })}
      >
        {isSelected ? (
          <MoonFilledIcon size={svgSize} />
        ) : (
          <SunFilledIcon size={svgSize} />
        )}
      </div>
    </Component>
  )
}
