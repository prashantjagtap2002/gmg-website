"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks, siteConfig } from "@/content/site";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-[75px] bg-black/[.18] px-[10px] md:h-[82px]">
        <div className="mx-auto flex h-full w-full items-center justify-between md:w-[95%]">
          <Link href="/" aria-label={siteConfig.name} className="relative top-[10px] md:top-[6px]">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              priority
              className="h-auto w-[41px] md:w-[54px]"
              sizes="54px"
            />
          </Link>

          <nav aria-label="Menu" className="hidden min-[1025px]:block">
            <ul className="flex">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(pathname, link.href) ? "page" : undefined}
                    className="block px-5 py-[13px] text-[17px] leading-5 font-medium text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            aria-label="Menu Toggle"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex size-[33px] items-center justify-center text-white min-[1025px]:hidden"
          >
            <svg viewBox="0 0 1000 1000" className="size-[22px] fill-current" aria-hidden>
              {open ? (
                <path d="M742 167L500 408 258 167C246 154 233 150 217 150 196 150 179 158 167 167 154 179 150 196 150 212 150 229 154 242 171 254L408 500 167 742C138 771 138 800 167 829 196 858 225 858 254 829L496 587 738 829C750 842 767 846 783 846 800 846 817 842 829 829 842 817 846 804 846 783 846 767 842 750 829 737L588 500 833 258C863 229 863 200 833 171 804 137 775 137 742 167Z" />
              ) : (
                <path d="M104 333H896C929 333 958 304 958 271S929 208 896 208H104C71 208 42 237 42 271S71 333 104 333ZM104 583H896C929 583 958 554 958 521S929 458 896 458H104C71 458 42 487 42 521S71 583 104 583ZM104 833H896C929 833 958 804 958 771S929 708 896 708H104C71 708 42 737 42 771S71 833 104 833Z" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <nav aria-label="Mobile menu" className="absolute inset-x-0 top-[64px] bg-white min-[1025px]:hidden">
            <ul>
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`block px-5 py-2.5 text-[17px] leading-5 font-medium ${
                        active ? "bg-[#3f444b] text-white" : "text-[#33373d] hover:bg-[#3f444b] hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </header>
      {/* Keeps page content clear of the fixed header, like Elementor's sticky spacer. */}
      <div aria-hidden className="h-[75px] shrink-0 md:h-[82px]" />
    </>
  );
}
