"use client";

import { GovContainer, GovNav, GovNavItem } from "@gov-design-system-ce/react";
import React from "react";
import HeaderSearch from "./HeaderSearch";
import LangSwitcher from "./LangSwitcher";
import HeaderLogo from "./HeaderLogo";
import HamburgerMenu from "./HamburgerMenu";
import LoginButton from "./LoginButton/LoginButton";
import "./Navbar.css";
import { usePathname } from "next/navigation";

export interface NavbarProps {
  lang: string;
}

const Navbar = (props: NavbarProps) => {
  const pathname = usePathname();

  const navLinks = [
    {
      label: "home",
      url: "/",
    },
    {
      label: "Link 2",
      url: "/link-2",
    },
    {
      label: "Link 3",
      url: "/link-3",
    },
    {
      label: "Link 4",
      url: "/link-4",
    },
    {
      label: "Link 5",
      url: "/link-5",
    },
    {
      label: "Link 6",
      url: "/link-6",
    },
    {
      label: "Link 7",
      url: "/link-7",
    },
    {
      label: "Link 8",
      url: "/link-8",
    },
    {
      label: "Link 9",
      url: "/link-9",
    },
    {
      label: "Link 10",
      url: "/link-10",
    },
  ];

  return (
    <header className="bg-[var(--gov-color-primary-600)]">
      <GovContainer className="px-[1.25rem] py-0">
        <div className="flex items-center justify-between gap-6 pb-[1.0625rem] pt-[2rem] max-lg:flex-wrap">
          <div className="flex w-full justify-between lg:w-auto">
            <HeaderLogo />
            <div className="flex w-32 items-center justify-between lg:hidden">
              <HamburgerMenu navLinks={navLinks} lang={props.lang} />
              <LangSwitcher lang={props.lang} />
            </div>
          </div>
          <div className="flex w-full justify-end gap-8">
            <HeaderSearch />
            <LoginButton link="/" />
            <div className="hidden lg:flex">
              <LangSwitcher lang={props.lang} />
            </div>
          </div>
        </div>
        <hr
          aria-hidden="true"
          className="z-2 border-b-solid relative hidden w-full border-b-[1px] border-b-[var(--gov-color-primary-400)] lg:block"
        />
        <GovNav className="hidden lg:block">
          {navLinks?.map((link, index) => (
            <GovNavItem
              key={index}
              href={link.url}
              class={`${index === 0 ? "first-nav-item" : ""} ${
                index === navLinks.length - 1 ? "last-nav-item" : ""
              }`}
              className={
                (pathname?.startsWith(link.url) && link.url !== "/") ||
                (link.url === "/" && pathname === "/")
                  ? "active"
                  : ""
              }
            >
              {link.label}
            </GovNavItem>
          ))}
        </GovNav>
      </GovContainer>
    </header>
  );
};

export default Navbar;
