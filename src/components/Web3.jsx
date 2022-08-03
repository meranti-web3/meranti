import * as React from "react";

export function Web3() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
        <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
          Web3.
        </h2>

        <p className="mt-6 text-lg tracking-tight text-blue-100">
          Ajoutez à vos applications Web les possibilités offertes par la
          Blockchain et découvrez le monde du Web3.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-x-8 mt-16">
        <div className="relative">
          <h3 className="mt-6 text-2xl font-medium text-white">NFT</h3>

          <p className="mt-2 font-display text-xl text-blue-100">
            Propriété digitale
          </p>

          <p className="mt-4 font-display text-sm text-blue-100">
            Associer un bien digital à leur propriétaire au travers de leur
            Wallet.
          </p>
        </div>

        <div className="relative">
          <h3 className="mt-6 text-2xl font-medium text-white">Crypto</h3>

          <p className="mt-2 font-display text-xl text-blue-100">
            Monnaie digitale
          </p>

          <p className="mt-4 font-display text-sm text-blue-100">
            Création de monnaies digitales, ou virtuelles, avec leurs propres
            économies et acteurs, liées ou non à d'autres monnaies existantes.
          </p>
        </div>

        <div className="relative">
          <h3 className="mt-6 text-2xl font-medium text-white">DeFi</h3>

          <p className="mt-2 font-display text-xl text-blue-100">
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
