import * as React from "react";

export function Web3() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
        <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
          Web3.
        </h2>

        <p className="mt-6 text-lg tracking-tight text-blue-100">
          Les nouvelles technologies du Web3 ouvrent la voie a un internet plus decentralise, et faciliant l'echange d'information et de biens de maniere transparente et securisee.
        </p>
      </div>

      <div className="grid md:grid-cols-5 sm:grid-cols-1 gap-x-8 mt-16">
        <div className="relative">
          <h3 className="mt-6 text-2xl font-medium text-cyan-300">Décentralisation</h3>

          <p className="mt-4 font-display text-sm text-blue-100">
            La technologie de la blockchain offre une decentralisation des donnees et des applications evitant leur controle total par une entite centrale, qu'elle soit privee ou publique. Les utilisateurs peuvent reprendre le controle de leurs donnes.
          </p>
        </div>

        <div className="relative">
          <h3 className="mt-6 text-2xl font-medium text-white">Echanges</h3>

          <p className="mt-2 font-display text-xl text-cyan-300">
            Echange d'informations, biens, monnaies digitales, la blockchain 
          </p>

          <p className="mt-4 font-display text-sm text-blue-100">
            Création de monnaies digitales, ou virtuelles, avec leurs propres
            économies et acteurs, liées ou non à d'autres monnaies existantes.
          </p>
        </div>

        <div className="relative">
          <h3 className="mt-6 text-2xl font-medium text-white">DeFi</h3>

          <p className="mt-2 font-display text-xl text-cyan-300">
            Services financiers décentralisés
          </p>

          <p className="mt-4 font-display text-sm text-blue-100">
            Echanges entre différentes monnaies, prêts, placements avec
            intéréts, et bien d'autres.
          </p>
        </div>
      </div>
    </div>
  );
}
