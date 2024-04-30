import { usePathname, useRouter } from "next/navigation";
import React, { FC, useState } from "react";

interface LanguageSwitcherProps {
  lang: string;
}

const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ lang }) => {
  const [language, setLanguage] = useState(lang === "cs" ? "EN" : "CZ");

  const toggleLanguage = () => {
    // Toggle between "CZ" and "EN"
    const newLanguage = language === "CZ" ? "EN" : "CZ";
    setLanguage(newLanguage);
  };

  return (
    <div className="flex w-6 cursor-pointer items-center">
      <button
        className="focus:outline-offset-3 text-white"
        onClick={toggleLanguage}
        aria-label={"aria-label"}
      >
        {/* Display the language based on state */}
        {language}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
