"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageToggle } from "./LanguageToggle";

interface HeaderProps {
  agentName: string;
  brokerageShort: string;
  phone: string;
  phoneDisplay: string;
  chineseEnabled: boolean;
}

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/listings", label: "Listings" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/neighborhoods", label: "Neighborhoods" },
  { href: "/contact", label: "Contact" },
];

export function Header({
  agentName,
  brokerageShort,
  phone,
  phoneDisplay,
  chineseEnabled,
}: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-navy/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12 lg:px-20">
        <Link href="/" className="group">
          <span className="font-serif text-xl tracking-widest text-gold uppercase md:text-2xl">
            {brokerageShort}
          </span>
          <span className="mt-0.5 block text-[10px] tracking-[0.2em] text-white/50 uppercase">
            {agentName}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs tracking-widest uppercase transition-colors ${
                pathname === link.href
                  ? "text-gold"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <LanguageToggle chineseEnabled={chineseEnabled} variant="light" />
          <a
            href={`tel:${phone}`}
            className="text-xs tracking-widest text-white/80 uppercase transition-colors hover:text-gold"
          >
            {phoneDisplay}
          </a>
          <Link href="/contact" className="btn-primary py-2.5 text-xs">
            Connect
          </Link>
        </div>

        <button
          type="button"
          className="flex flex-col gap-1.5 lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-white/10 bg-navy lg:hidden"
          >
            <nav className="flex flex-col px-6 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`border-b border-white/5 py-4 text-sm tracking-widest uppercase ${
                    pathname === link.href ? "text-gold" : "text-white/80"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 flex items-center justify-between">
                <LanguageToggle
                  chineseEnabled={chineseEnabled}
                  variant="light"
                />
                <a
                  href={`tel:${phone}`}
                  className="text-sm text-gold"
                >
                  {phoneDisplay}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
