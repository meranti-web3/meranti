import * as React from "react";
import merantiLogo from "../images/meranti.svg";

function MenuItem({ href, children }) {
  return (
    <a
      className="rounded-lg py-1 px-2 text-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 flex"
      href={href}
    >
      {children}
    </a>
  );
}

export function PageHeader() {
  return (
    <header className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12 mr-4">
            <a aria-label="Home" href="/#">
              <img
                className="object-contain w-[220px]"
                src={merantiLogo}
                alt="Meranti"
              />
            </a>
          </div>
          <div className="flex md:gap-x-6">
            <MenuItem href="/#technologies">Technos</MenuItem>
            <MenuItem href="/#services">Services</MenuItem>
            <MenuItem href="/#contact">Contact</MenuItem>
            <MenuItem href="/blog">
              Blog
              <span className="ml-1 text-xs text-meranti-100 border border-meranti-100 rounded-full p-1 align-baseline">
                New!
              </span>
            </MenuItem>
          </div>
        </nav>
      </div>
    </header>
  );
}
