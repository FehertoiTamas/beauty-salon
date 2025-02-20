"use client";

import "../styles/login.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useTranslations } from "next-intl";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Jelszó láthatóság állapot

  const t = useTranslations("LoginPage");

  useEffect(() => {
    if (session) {
      const currentLocale = window.location.pathname.split("/")[1]; // Nyelv kiszedése az URL-ből
      router.push(`/${currentLocale}/admin`);
    }
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
    }
  };

  return (
    <main className="login-page">
      <div className="login-container">
        <h1>{t("title")}</h1>

        {/* Google Login */}
        <button
          onClick={() => signIn("google")}
          className="login-button google-button"
        >
          Sign in with Google
        </button>

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
    </main>
  );
}
