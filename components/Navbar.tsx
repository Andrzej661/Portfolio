import {
  Button,
  Kbd,
  Link,
  Input,
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem
} from "@nextui-org/react"

import { link as linkStyles } from "@nextui-org/theme"

import { siteConfig } from "@/config/site"
import NextLink from "next/link"
import clsx from "clsx"

import { ThemeSwitch } from "@/components/theme-switch"
import { GithubIcon } from "@/components/icons"

import { Logo } from "@/components/icons"
import ResumeButton from "./ResumeButton"

export const Navbar = () => {
  return (
    <NextUINavbar
      position="sticky"
      maxWidth="full"
      className=" mx-auto flex  max-w-[354px] flex-nowrap place-content-center items-center px-0 sm:max-w-[1328px] lg:ml-auto
 "
    >
      <NavbarContent
        className=" mx-0 hidden w-full px-0 md:block"
        justify="start"
      >
        <NextLink className="flex  items-center justify-start " href="/">
          {/* <Logo /> */}
        </NextLink>
      </NavbarContent>
      <NavbarContent justify="end" className=" mx-0 px-0">
        <NavbarItem className=" flex justify-end gap-2 ">
          <Link isExternal href={siteConfig.links.github}>
            <GithubIcon size={36} className=" text-foreground" />
          </Link>
          <ThemeSwitch svgSize={36} />
          {/* <div className="hidden  justify-end gap-4 text-sm md:flex ">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:font-medium, data-[active=true]:text-primary"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </div> */}
        </NavbarItem>
        <NavbarItem>
          <ResumeButton />
        </NavbarItem>
        <NavbarItem>
          <Button
            variant="solid"
            size="md"
            color="primary"
            className=" w-20 font-extrabold tracking-wider text-white sm:w-32 "
          >
            Contact
          </Button>
        </NavbarItem>
        {/* <NavbarMenuToggle className="flex md:hidden" /> */}
      </NavbarContent>

      {/* <NavbarMenu>
        <div className="mx-4  mt-2 flex  items-center justify-center gap-10">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 3
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "foreground"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu> */}
    </NextUINavbar>
  )
}
