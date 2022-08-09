import * as React from "react";
import merantiLogo from "../images/meranti.svg";

export function PageHeader() {
  return (
    <header className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12 mr-4">
            <a aria-label="Home" href="/#">
              <img
                className="object-cover mr-3 pr-3 w-[150px]"
                src={merantiLogo}
                alt="Meranti"
              />
            </a>
          </div>
          <div className="flex md:gap-x-6">
            <a
              className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              href="/#web3"
            >
              Web3
            </a>
            <a
              className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              href="/#services"
            >
              Services
            </a>
            <a
              className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              href="/#team"
            >
              Equipe
            </a>
            <a
              className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              href="/#contact"
            >
              Contact
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
