import {
  GovContainer,
  GovIcon,
  GovNav,
  GovNavItem,
} from "@gov-design-system-ce/react";
import React, { FC, useEffect, useState } from "react";
import LoginButton from "../LoginButton/LoginButton";
import { FocusTrap } from "@mui/base";
import LanguageSwitcher from "../LangSwitcher";
import Link from "next/link";

interface HamburgerMenuProps {
  navLinks: { label: string; url: string }[];
  lang: string;
}

const HamburgerMenu: FC<HamburgerMenuProps> = ({ navLinks, lang }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Function to add 'overflow-hidden' class from body based on 'open' state
    if (open) {
      document.body.classList.add("overflow-hidden");
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    // Add event listener for keydown
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        className="flex items-center justify-center gap-4 focus-visible:outline-offset-4 lg:hidden"
        onClick={() => setOpen(!open)}
      >
        <span className="text-white">Menu</span>
        <GovIcon
          type="basic"
          name={open ? "x-lg" : "list"}
          className="cursor-pointer items-center text-white"
        />
      </button>
      {open && (
        <FocusTrap open={open}>
          <div className="absolute bottom-0 right-0 top-0 z-20 block h-screen w-[calc(100vw-5%)] overflow-y-scroll bg-[var(--gov-color-primary-600)] pb-[1.25rem] xs:w-[22.5rem]">
            <GovContainer className="py-8">
              <div className="z-10 flex h-[52px] w-full items-center justify-between">
                <Link
                  className="flex h-[52px] w-[52px] items-center focus:outline-offset-4 focus:outline-white"
                  href="/"
                  aria-label="Úvod"
                >
                  <GovIcon type="basic" name="logo" className="text-white" />
                </Link>
                <div className="flex w-32 justify-between">
                  <button
                    className="flex justify-center gap-4 focus:outline-offset-4 lg:hidden"
                    onClick={() => setOpen(!open)}
                  >
                    <span className="text-white">Menu</span>
                    <GovIcon
                      type="basic"
                      name={open ? "x-lg" : "list"}
                      className="cursor-pointer items-center text-white"
                    />
                  </button>
                  <LanguageSwitcher lang={lang} />
                </div>
              </div>
            </GovContainer>
            <GovNav className="text-left">
              {navLinks.map((link, key) => (
                <GovNavItem key={key} href={link.url}>
                  {link.label}
                </GovNavItem>
              ))}
            </GovNav>
            <div className="flex justify-center">
              <hr className="h-[0.5px] w-11/12 border-b-[0.5px] border-b-[var(--gov-color-primary-100)] align-middle" />
            </div>

            <LoginButton
              className="pb-[0.9375rem] pl-[1.25rem] pr-[3rem] pt-[2rem]"
              link="/"
            />
          </div>
        </FocusTrap>
      )}
      {open && (
        <div className="absolute inset-0 z-10 flex overflow-auto bg-black bg-opacity-50 backdrop-blur-sm" />
      )}
    </>
  );
};

export default HamburgerMenu;
