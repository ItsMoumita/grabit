"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

// Icons (inline, like your snippet)
const MenuIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
    className={className}
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);
const XIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/dashboard/add-product", label: "Add Product" }, // protected
  ];
  return (
    <header className="backdrop-blur-sm sticky top-0 z-50">
         <div className="max-w-6xl bg-[white] dark:bg-[#292b51] container mx-auto rounded-full mt-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className=" flex-shrink-0 font-extrabold text-3xl text-[#2a4ba7] dark:text-[#b8d9ff]">
             <span className="font-brand ">Grabit</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (   
              <Link
                key={link.label}
                href={link.href}
                className="text-lg font-medium text-[#2a4ba7] dark:text-[#b8d9ff] hover:border-b-2  dark:hover:border-b-2 transition-colors duration=300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center justify-center  text-lg font-medium px-2  text-[#2a4ba7] dark:text-[#b8d9ff] hover:border-b-2  dark:hover:border-b-2 transition-colors"
            >
              Login
            </Link>

            {/* Theme toggle (your exact component) */}
            <ThemeToggle />

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen((v) => !v)}
                className="inline-flex items-center justify-center p-2 rounded-md text-[#2a4ba7] dark:text-[#b8d9ff] hover:text-[#2a4ba7]/80 dark:hover:text-[#2a4ba7]/80  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#2a4ba7] dark:focus:ring-[#b8d9ff] transition-colors"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <XIcon className="h-6 w-6" />
                ) : (
                  <MenuIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-[white]/80 dark:bg-[#292b51]/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg mx-4 mt-2 mb-4 text-center"
        >
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-[#2a4ba7] dark:text-[#b8d9ff] hover:bg-[#2a4ba7]/30 dark:hover:bg-[#b8d9ff]/30  dark:hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="block mt-2 text-center items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-[#2a4ba7] dark:bg-white text-white dark:text-gray-900 hover:bg-[#2a4ba7]/90 dark:hover:bg-gray-100 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}