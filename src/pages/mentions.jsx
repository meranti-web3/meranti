import * as React from "react";

import { PageHeader } from "../components/PageHeader";
import { PageFooter } from "../components/PageFooter";
import { PageHead } from "../components/PageHead";

function MentionsPage() {
  return (
    <div className="flex h-full flex-col bg-slate-50">
      <PageHeader />
      <main>
        <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Mentions légales
              </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Bureaux</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    KMØ - 30 rue François Spoerry, France
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Siège social
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    16 rue de Steinbach, 68200 Mulhouse, France
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Forme juridique
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    SARL au capital de 1 000€
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">SIRET</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    91755282000016
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Numéro TVA intracommunautaire
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    FR38917552820
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Numéro RCS
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    Mulhouse B 917 552 820
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Données personnelles et cookies
              </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 text-sm text-gray-900">
              Meranti.fr ne fait pas usage de cookies et ne collecte pas de
              données privées relatives à ses utilisateurs. Contactez notre
              délégué à la protection des données (DPO){" "}
              <a
                href="mailto:donnees+portal@meranti.fr"
                className="hover:underline text-meranti-100"
              >
                donnees+portal@meranti.fr
              </a>
              .
            </div>
          </div>
        </div>
      </main>
      <PageFooter />
    </div>
  );
}

export default MentionsPage;

export function Head() {
  return <PageHead />;
}
