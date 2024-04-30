import React, { useRef } from "react";
import { useSearchParams } from "next/navigation";
import Search from "@/components/Search";

const HeaderSearch = () => {
  const ref = useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams();
  const search = searchParams.get("q") ?? "";

  return (
    <form ref={ref} className="w-full lg:w-[325px]">
      <Search
        placeholder="Hledat"
        name={"q"}
        value={String(search)}
        size="m"
        onSearch={(search) => {
          ref.current?.submit();
        }}
        className="focus:outline-white"
        inverse
      />
    </form>
  );
};

export default HeaderSearch;
