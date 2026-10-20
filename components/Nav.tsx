"use client";

import Image from "next/image";
import { useState } from "react";
import { DOWNLOAD_URL } from "@/lib/site";

const LINKS = [
  { href: "#top", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#pixies", label: "Pixies" },
  { href: "#privacy", label: "Privacy" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <a href="#top" className="brand" aria-label="DeskPixie home">
        <Image src="/icon-1024.png" alt="" width={46} height={46} />
      </a>
      <nav className="nav-pill" aria-label="Main">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="nav-link">
            {l.label}
          </a>
        ))}
      </nav>
      <a href={DOWNLOAD_URL} className="header-link">
        Download <span aria-hidden>↗</span>
      </a>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>
      {open && (
        <div className="mobile-menu" onClick={() => setOpen(false)}>
          <div className="menu-sheet">
            <nav>
              {LINKS.map((l) => (
                <a key={l.href} href={l.href}>
                  {l.label}
                </a>
              ))}
              <a href={DOWNLOAD_URL} className="menu-download">
                Download for Mac ↗
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
