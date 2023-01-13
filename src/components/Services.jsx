import * as React from "react";

const steps = [
  {
    name: "Vous ne savez pas que faire du Web3?",
    description: "Les cas d'usage sont encore peu connu. Nous pouvons imaginer ensemble des usages selon votre domaine d'activite"
  },
  {
    name: "Vous avez une idee mais ne savez pas ou commencer?",
    description:
      "D'une idee initiale, nous apportons nos conseils pour vous aider a demarrer votre projet. Design de solution, recrutement, formation, developpement, execution, nous sommes presents a toutes les etapes"
  },
  {
    name: "Vous avez un projet en cours mais il n'atteint pas ses objectifs",
    description:
      "Nous faisons un etat des lieux de votre projet et vous conseillons les potentiels correctifs a apporter. Nous pouvons egalement vous aider a les mettre en oeuvre"
  },
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
          suivons jusqu'a la reussite de vos projets. Grace a notre experience en developpement logiciel nous pouvons vous accompagner quel que soit votre degre de maturite avec les technologies du Web3.
        </p>
      </div>

      <nav aria-label="Progress" className="mx-auto max-w-2xl py-16">
        <ol className="overflow-hidden">
          {steps.map((step) => (
            <li key={step.name} className="relative pb-10">
              <span className="relative flex items-center group">
                <span className="h-9 flex items-center">
                  <span className="relative z-10 w-4 h-1 flex items-center justify-center bg-meranti-100 group-hover:bg-cyan-600 text-white">
                    &nbsp;
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
