import * as React from "react";

export function Contact() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
      <div className="grid grid-cols-2 gap-8">
        <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
          Contactez-nous
        </h2>
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900 text-extrabold">
            Meranti
          </h3>
          <div className="mt-2 text-base text-gray-500">
            <p>16 rue de Steinbach</p>
            <p className="mt-1">68200 Mulhouse, France</p>
            <a
              href="mailto:contact+portal@meranti.fr"
              className="hover:underline mt-1"
            >
              contact+portal@meranti.fr
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
