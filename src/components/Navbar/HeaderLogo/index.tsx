import { GovIcon } from "@gov-design-system-ce/react";
import Link from "next/link";
import React from "react";

const HeaderLogo = () => {
  return (
    <Link
      className="flex items-center focus:outline-white"
      href="/"
      aria-label={"logo"}
    >
      <GovIcon type="basic" name="logo" className="h-[52px] w-[52px]" />
      <div className="ml-4 hidden text-lg font-bold text-white sm:block">
        Logo title
      </div>
    </Link>
  );
};

export default HeaderLogo;
