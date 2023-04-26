import * as React from "react";

export function Technologies() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
        <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
          Nos Technologies.
        </h2>

        <p className="mt-6 text-xl tracking-tight text-blue-100">
          Les nouvelles technologies du Web ouvrent la voie à un Internet plus
          accessible, intelligent, disponible, performant, décentralisé et
          durable. Du Cloud à la Blockchain en passant par l'Intelligence
          Artificielle, transformez votre activité et donnez lui un temps
          d'avance.
        </p>
      </div>

      <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-x-8 mt-16">
        <div className="relative">
          <h3 className="mt-6 text-2xl font-medium text-white">
            Dév. Web et Blockchain
          </h3>

          <p className="mt-2 font-display text-xl text-cyan-300">
            Nos technologies favorites
          </p>

          <p className="mt-4 font-display text-md text-blue-100">
            TypeScript, React, Angular, Node, Deno, Ag Grid, ChartIQ, ChartJS,
            Tailwind, Material, Bootstrap, Progressive Web Apps, REST, GraphQL,
            Express, WebSockets, Knex, MongoDB, Ethereum, Solidity, Tezos, Ligo,
            Cypress, Playwright, Jest, Mocha et bien d'autres.
            <span className="block">&nbsp;</span>
            Nous suivons les nouvelles tendances afin de pouvoir toujours offrir
            les meilleurs solutions.
          </p>
        </div>
        <div className="relative">
          <h3 className="mt-6 text-2xl font-medium text-white">Open Source</h3>

          <p className="mt-2 font-display text-xl text-cyan-300">
            Ensemble nous irons plus loin
          </p>

          <p className="mt-4 font-display text-md text-blue-100">
            L'utilisation des technologies Open Source permet d'accélérer le
            développement logiciel, d'améliorer la qualité et de réduire les
            coûts en intégrant des éléments éprouvés et maintenus par de larges
            communautés de développeurs.
            <span className="block">&nbsp;</span>
            Chez Meranti, nous sommes fiers d'être également contributeurs Open
            Source.
          </p>
        </div>

        <div className="relative">
          <h3 className="mt-6 text-2xl font-medium text-white">Cloud</h3>

          <p className="mt-2 font-display text-xl text-cyan-300">
            La tête dans les nuages
          </p>

          <p className="mt-4 font-display text-md text-blue-100">
            Améliorez la disponibilité de vos services, scalez à la demande,
            déployez rapidement et facilement de nouvelles solutions, maîtrisez
            vos coûts et votre impact environnemental en utilisant les
            technologies du Cloud.
            <span className="block">&nbsp;</span>
            Chez Meranti nos applications sont "12 factor" pour que vous
            puissiez les déployer chez AWS, GCP, Scalingo ou toute autre
            solution Cloud de votre choix. Nous pouvons aussi vous aider à
            choisir votre fournisseur.
          </p>
        </div>

        <div className="relative">
          <h3 className="mt-6 text-2xl font-medium text-white">
            Blockchain / DLT
          </h3>

          <p className="mt-2 font-display text-xl text-cyan-300">
            Echange de biens et de données
          </p>

          <p className="mt-4 font-display text-md text-blue-100">
            Un registre de données décentralisé, sécurisé, infalsifiable,
            transparent, programmable et ouvert à tous pour échanger en toute
            confiance. Solutions de paiement, de compliance, de sécurité, de
            fidélisation, d'échange, ou applications ludiques, les cas d'usages
            se multiplient et nous sommes loin d'en avoir fait le tour.
            <span className="block">&nbsp;</span>Quel sera le votre?
          </p>
        </div>
      </div>
    </div>
  );
}
