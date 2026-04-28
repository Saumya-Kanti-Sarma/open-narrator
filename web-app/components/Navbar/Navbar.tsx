/**
 * Purpose: Top navigation bar with logo, nav links, and CTA. Collapses to hamburger dropdown on mobile.
 * Used in: app/page.tsx
 * Dependencies: Button element, Next.js Image, Next.js Link, react-icons
 */

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import Button from "../elements/Button";
import styles from "./Navbar.module.css";

/**
 * Component: Navbar
 * Description: Sticky top nav with logo, desktop nav links, mobile hamburger dropdown, and CTA button
 * Props: none
 */

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Community", href: "#community" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function scrollToBeta() {
    document.getElementById("beta")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" aria-label="Open Narrator home" className={styles.logo}>
          {/* <Image src="/logo.svg" alt="Open Narrator logo" width={40} height={40} priority /> */}
          <Image
            src="/open-narrator-text.svg"
            alt="Open Narrator"
            width={300}
            height={24}
            priority
            style={{ width: "clamp(140px, 40vw, 300px)", height: "auto" }}
          />
        </Link>

        {/* Desktop links */}
        <div className={styles.desktopLinks}>
          {navLinks.map(({ label, href }) => (
            <Link key={label} href={href} className={`${styles.navLink} text-m`}>
              {label}
            </Link>
          ))}
          {/* Desktop CTA */}
          <div className={styles.desktopCta}>
            <Button variant="secondary" ariaLabel="Get early access" onClick={scrollToBeta}>
              Apply For Early Access
            </Button>
          </div>
        </div>



        {/* Mobile: hamburger + CTA row */}
        <div className={styles.mobileRight}>
          <Button variant="primary" ariaLabel="Get early access" onClick={scrollToBeta}>
            Early Access
          </Button>
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className={styles.dropdown} role="menu">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              role="menuitem"
              className={styles.dropdownLink}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
