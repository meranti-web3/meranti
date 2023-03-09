import * as React from "react";

export function Technologies() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
        <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
          Nos Technologies.
        </h2>

        <p className="mt-6 text-xl tracking-tight text-blue-100">
          Les nouvelles technologies du Web ouvrent la voie a un Internet plus
          accessible, intelligent, disponible, performant, decentralise et
          durable. Du Cloud a la blockchain en passant par l'intelligence
          artificelle, les nouvelles technologies
        </p>
      </div>

      <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-x-8 mt-16">
        <div className="relative">
          <h3 className="mt-6 text-2xl font-medium text-white">Open Source</h3>

          <p className="mt-2 font-display text-xl text-cyan-300">Logiciel </p>

          <p className="mt-4 font-display text-md text-blue-100">
            L'utilisation des technologies Open source permet d'accélérer le
            développement logiciel, d'améliorer la qualité et de réduire les
            coûts en intégrant des éléments éprouvés et maintenus par de larges
            communautés de développeurs. Chez Meranti, nous sommes fiers d'être
            également contributeurs Open Source.
          </p>
        </div>

        <div className="relative">
          <h3 className="mt-6 text-2xl font-medium text-white">Cloud</h3>

          <p className="mt-2 font-display text-xl text-cyan-300">
            Infrastructure a la demande
          </p>

          <p className="mt-4 font-display text-md text-blue-100">
            Ameliorer la disponibilite de vos services, scalez a la demande,
            deployez rapidement et facilement de nouvelles solutions, maitrisez
            vos couts et votre impact environemental en utilisant les
            technologies du Cloud.
          </p>
        </div>

        <div className="relative">
          <h3 className="mt-6 text-2xl font-medium text-white">
            Blockchain / DLT
          </h3>

          <p className="mt-2 font-display text-xl text-cyan-300">
            Echange de biens et informations
          </p>

          <p className="mt-4 font-display text-md text-blue-100">
            Un registre de donnees decentralise, securise, infalsifiable,
            transparent et programmable pour echanger des biens et des donnees
            dans des environnements a faible confiance. Solutions de paiements,
            de commerce, de compliance, de securite, d'audit ou ludiques, les
            cas d'usages se multiplient et offrent une nouvelle dimension au Web
            tel que nous le connaissons. En savoir plus.
          </p>
        </div>

        <div className="relative">
          <h3 className="mt-6 text-2xl font-medium text-white">
            Intelligence Artificielle
          </h3>

          <p className="mt-2 font-display text-xl text-cyan-300">
            Donnez vie a vos donnees
          </p>

          <p className="mt-4 font-display text-md text-blue-100">
            Création de monnaies digitales, ou virtuelles, avec leurs propres
            économies et acteurs, liées ou non à d'autres monnaies existantes.
          </p>
        </div>
      </div>
    </div>
  );
}
