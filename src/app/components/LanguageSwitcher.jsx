"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaGlobe } from "react-icons/fa"; // Földgömb ikon a React Icons csomagból
import "../[locale]/styles/language-switcher.css";

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const languages = ["en", "hu", "esp"];

  const changeLanguage = (locale) => {
    const segments = pathname.split("/").filter(Boolean);
    if (languages.includes(segments[0])) {
      segments[0] = locale;
    } else {
      segments.unshift(locale);
    }
    const newPathname = `/${segments.join("/")}`;
    router.push(newPathname);
    setIsOpen(false);
  };

  return (
    <div className="lang-switcher-container">
      {/* Földgömb ikon gomb */}
      <button className="globe-btn" onClick={() => setIsOpen(!isOpen)}>
        <FaGlobe size={24} />
      </button>

      {/* Lenyíló menü */}
      {isOpen && (
        <div className="dropdown-menu">
          {languages.map((lang) => (
            <button
              key={lang}
              className="lang-switcher-btn"
              onClick={() => changeLanguage(lang)}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
