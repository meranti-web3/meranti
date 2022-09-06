import * as React from "react";

export function Hero() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-20 text-center lg:pt-32 lg:pb-32">
      <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
        Meranti, agence de développement <span className="text-meranti-100">Web3</span> à
        Mulhouse.
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
        Développement d'applications Web et Blockchain au service de l'économie
        Mulhousienne.
      </p>

      <div className="mt-10 flex justify-center gap-x-6">
        <a
          href="/#contact"
          className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
        >
          Contactez-nous
        </a>
      </div>
    </div>
  );
}
