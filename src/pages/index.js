import * as React from "react";

import { PageHeader } from "../components/PageHeader";

function IndexPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Meranti - Web3 à Mulhouse
      </h1>
      <p>
        Développement d'applications Web et Blockchain au service de l'économie
        Mulhousienne.
      </p>

      <div>
        <p>
          Développement Web + Blockchain = Applications avec système économique
          spécialisé
        </p>
        <p></p>
      </div>
    </div>
  );
}

export default IndexPage;

export function Head() {
  return <PageHeader />;
}
