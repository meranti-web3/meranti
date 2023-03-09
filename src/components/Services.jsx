import * as React from "react";

const steps = [
  {
    name: "Vous ne savez pas que faire du Web3",
    description:
      "Les cas d'usage sont nombreux mais encore méconnus. Imaginons ensemble ceux qui vous différencieront aujourd'hui."
  },
  {
    name: "Vous avez une idée mais ne savez pas par où commencer",
    description:
      "D'une idée initiale, nous apportons nos conseils pour vous aider à démarrer votre projet. Design de solution, recrutement, formation, développement, exécution, nous sommes présents à toutes les étapes."
  },
  {
    name: "Vous avez un projet en cours mais il n'atteint pas ses objectifs",
    description:
      "Nous faisons un état des lieux de votre projet et vous conseillons les potentiels correctifs à apporter. Nous pouvons également vous aider à les mettre en oeuvre."
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
          suivons jusqu'à la réussite de vos projets. Grâce à notre expérience
          en développement logiciel nous pouvons vous accompagner quel que soit
          votre degré de maturité technologique.
        </p>
      </div>

      <nav aria-label="Progress" className="mx-auto max-w-2xl py-16">
        <ol className="overflow-hidden">
          {steps.map((step) => (
            <li key={step.name} className="relative pb-10">
              <span className="relative flex items-center group">
                <span className="h-9 flex items-center">
                  <span className="relative z-10 flex items-center text-xl font-bold justify-center text-meranti-100">
                    ?
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
