"use client";

import "../styles/login.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useTranslations } from "next-intl";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname(); // Megbízhatóbb módszer az URL elérésére

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Jelszó láthatóság állapot

  const t = useTranslations("LoginPage");

  useEffect(() => {
    if (session) {
      const locale = pathname.split("/")[1]; // Nyelvi előtag meghatározása
      router.push(`/${locale}/admin`); // Admin oldalra irányítás helyes nyelven
    }
  }, [session, router, pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Fontos, hogy ne irányítson el automatikusan
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.refresh(); // Session frissítése
      const locale = pathname.split("/")[1]; // Nyelv kinyerése
      router.push(`/${locale}/admin`); // Átirányítás admin oldalra
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>{t("title")}</h1>

        {/*         <button
          onClick={() => signIn("google")}
          className="login-button google-button"
        >
          Sign in with Google
        </button>
 */}
        <hr style={{ margin: "20px 0" }} />

        {/* Email/Password Login */}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t("password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <button type="submit" className="login-button email-button">
            {t("submit-btn")}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}
