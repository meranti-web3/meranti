import * as React from "react";

import olivierMugshot from "../images/people/Olivier.png";

export function Team() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl md:text-center">
        <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
          Une équipe d'experts.
        </h2>

        <p className="mt-4 text-lg tracking-tight text-blue-100">
          De Wall Street à Grand Rue. Des méthodes et technologies importées de
          la finance et mises au service de l'économie locale.
        </p>
      </div>

      <div className="mx-auto py-12 px-4 max-w-4xl sm:px-6 lg:px-8 lg:py-24">
        <ul className="space-y-12 sm:divide-y mt-4 sm:space-y-0 sm:-mt-8 lg:gap-x-8 lg:space-y-0">
          <li className="sm:py-8">
            <div className="space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0">
              <div className="aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
                <img
                  className="object-cover shadow-lg rounded-lg text-blue-100"
                  src={olivierMugshot}
                  alt="Olivier Scherrer"
                />
              </div>
              <div className="sm:col-span-2">
                <div className="space-y-4">
                  <div className="text-lg leading-6 font-medium space-y-1">
                    <h3 className="text-white text-2xl">Olivier Scherrer</h3>
                    <p className="text-cyan-300">Gérant / Développeur Web3</p>
                  </div>
                  <div className="text-lg">
                    <p className="text-white">
                      Olivier suit l'évolution des technologies de l'Internet
                      depuis les années 90. Développeur Web et consultant, passé
                      par la City de Londres et Wall Street, Olivier apporte ses
                      compétences en développement d'applications Web à
                      l'économie locale de Mulhouse et ses environs.
                    </p>
                  </div>
                  <ul className="flex space-x-5 items-center">
                    <li>
                      <a
                        href="https://www.linkedin.com/in/olivier-scherrer-039b8441/"
                        className="text-blue-100 hover:text-white"
                      >
                        <span className="sr-only">LinkedIn</span>
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/podefr"
                        className="text-blue-100 hover:text-white"
                      >
                        <span className="sr-only">GitHub</span>
                        <svg
                          aria-hidden="true"
                          className="h-6 w-6"
                          fill="currentColor"
                        >
                          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"></path>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
