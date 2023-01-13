import * as React from "react";

export function Hero() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-20 text-center lg:pt-32 lg:pb-32">
      <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
        Une solution <span>Web3</span>sur mesure pour repondre a vos besoins.
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
        Conseil et Developpement d'applications Web3 pour les startups et entreprises.
        Nous guidons entreprises et startups dans le vaste univers du <span className="text-meranti-100">Web3</span> et garantissons le succes de vos projets. Nos experts vous accompagnent de la mise en place de votre projet jusqu'à leur aboutissement, en apportant une expertise reconnue mondialement.
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
