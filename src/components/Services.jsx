import * as React from "react";

const steps = [
  {
    name: "Prise de contact",
    description: "Vous nous contactez avec une idée, un problème, un projet."
  },
  {
    name: "Etude de vos besoins",
    description:
      "Nous convenons ensemble d'une solution qui répond spécifiquement à vos besoins."
  },
  {
    name: "Développement Agile",
    description:
      "Nous livrons continuellement une solution adaptée, même lorsque vos besoins changent."
  },
  {
    name: "Feedback",
    description:
      "Nous incorporons votre feedback pendant le cycle de développement."
  },
  {
    name: "Support",
    description: "Nous avons accompagnons après livraison du logiciel."
  }
];

export function Services() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl md:text-center">
        <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
          Des solutions techniques adaptées à vos besoins.
        </h2>

        <p className="mt-4 text-lg tracking-tight text-slate-700">
          Nous développons des solutions spécifiques à vos besoins et vous
          suivons après leur livraison, afin de garantir la réussite de vos
          projets.
        </p>
      </div>

      <nav aria-label="Progress" className="mx-auto max-w-2xl py-16">
        <ol className="overflow-hidden">
          {steps.map((step, stepIdx) => (
            <li key={step.name} className="relative pb-10">
              <span className="relative flex items-center group">
                <span className="h-9 flex items-center">
                  <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-blue-600 rounded-full group-hover:bg-blue-800 text-white">
                    {stepIdx + 1}
                  </span>
                </span>
                <span className="ml-4 min-w-0 flex flex-col">
                  <span className="text-sm font-semibold tracking-wide uppercase">
                    {step.name}
                  </span>
                  <span className="text-md text-gray-500">
                    {step.description}
                  </span>
                </span>
              </span>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
