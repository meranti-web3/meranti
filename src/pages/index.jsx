import * as React from "react";

import { PageHead } from "../components/PageHead";
import { PageFooter } from "../components/PageFooter";
import { PageHeader } from "../components/PageHeader";
import { Contact } from "../components/Contact";
import { Team } from "../components/Team";
import { Hero } from "../components/Hero";
import { Technologies } from "../components/Technologies";
import { Services } from "../components/Services";

function IndexPage() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader />

      <main>
        <Hero />

        <section
          id="technologies"
          aria-label="technologies"
          className="bg-meranti-100 py-20 sm:py-32"
        >
          <Technologies />
        </section>

        <section
          id="services"
          aria-label="Les services de Meranti"
          className="bg-slate-50 py-20 sm:py-32"
        >
          <Services />
        </section>

        <section
          id="team"
          aria-label="Meranti Team"
          className="bg-meranti-100 py-20 sm:py-32"
        >
          <Team />
        </section>

        <section
          id="contact"
          aria-label="Contactez-nous"
          className="bg-slate-50 py-20 sm:py-32"
        >
          <Contact />
        </section>
      </main>

      <PageFooter />
    </div>
  );
}

export default IndexPage;

export function Head() {
  return <PageHead />;
}
