import * as React from "react";

import Emphasis from "../components/Emphasis";

export function Hero() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 text-center lg:pt-24 lg:pb-32">
      <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl capitalize">
        Solutions <Emphasis>Web3</Emphasis> pour les pros.
      </h1>

      <p className="mx-auto mt-6 max-w-4xl text-xl tracking-tight text-slate-700">
        <Emphasis>Meranti</Emphasis> conçoit des solutions{" "}
        <Emphasis>Web</Emphasis> et <Emphasis>Blockchain</Emphasis> sur mesure,
        pour les startups, entreprises de toutes tailles, éditeurs de logiciels
        ou agences Web, avec une approche centrée sur l'expérience utilisateur.
      </p>

      <p className="mx-auto mt-6 max-w-4xl text-xl tracking-tight text-slate-700">
        Forts de notre expérience internationale, nous garantissons les plus
        hauts standards de <Emphasis>qualité</Emphasis> et nous nous engageons
        sur le <Emphasis>respect des coûts et des délais</Emphasis> grâce à nos
        outils et méthodes issus des domaines les plus exigeants, de la Silicon
        Valley à la finance de Wall Street.
      </p>

      <div className="mt-10 flex justify-center gap-x-6">
        <a
          href="/#contact"
          className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-xl font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
        >
          Contactez-nous
        </a>
        <a
          href="https://calendly.com/olivier-meranti-web3/30min"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-xl font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 border border-meranti-100 text-meranti-100 hover:bg-meranti-100 hover:text-white active:bg-slate-100 active:text-slate-500 focus-visible:outline-slate-900"
        >
          Prendre Rendez-Vous
        </a>
      </div>
    </div>
  );
}
