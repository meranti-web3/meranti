import * as React from "react";

import { Seo } from "../components/seo";

function IndexPage() {
  return (
    <div>
      <h1>Meranti - Web3 à Mulhouse</h1>
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
  return <Seo />;
}
