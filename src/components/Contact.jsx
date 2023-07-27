import * as React from "react";

export function Contact() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-6 sm:px-6 lg:py-24 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
          Contactez-nous
        </h2>
        <div>
          <h3 className="text-2xl leading-6 font-medium text-white text-extrabold">
            Meranti
          </h3>
          <div className="mt-2 text-lg text-slate-200">
            <p>KMØ - 30 rue François Spoerry</p>
            <p className="mt-1">68100 Mulhouse, France</p>
            <a
              href="mailto:contact+portal@meranti.fr"
              className="hover:underline mt-1 text-cyan-300"
            >
              contact+portal@meranti.fr
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
