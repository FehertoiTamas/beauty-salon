"use client";
import { usePathname, useRouter } from "next/navigation";
import "../[locale]/styles/language-switcher.css";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const languages = ["en", "hu", "esp"];

  const changeLanguage = (locale) => {
    const segments = pathname.split("/").filter(Boolean);

    // Ha az első szegmens a nyelv, módosítsuk
    if (languages.includes(segments[0])) {
      segments[0] = locale;
    } else {
      segments.unshift(locale); // Ha nincs nyelv, hozzáadjuk
    }

    // Az új URL generálása
    const newPathname = `/${segments.join("/")}`;

    // A `router.push` metódust használva navigálj az új URL-re
    router.push(newPathname);
  };

  return (
    <div className="lang-switcher-container">
      {languages.map((lang) => (
        <button
          className="lang-switcher-btns"
          key={lang}
          onClick={() => changeLanguage(lang)}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
