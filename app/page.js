import { dictionaries } from "@/lib/dictionary";
import { createPageMetadata } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Clients from "@/components/Clients";
import LocalLawSection from "@/components/LocalLawSection";
import Industries from "@/components/Industries";
import About from "@/components/About";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export const metadata = createPageMetadata("en");

export default function Home() {
  const dict = dictionaries.en;

  return (
    <main className="min-h-screen">
      <Navbar dict={dict.navbar} lang="en" />
      <Hero dict={dict.hero} />
      <Services dict={dict.services} />
      <Projects dict={dict.projects} />
      <Clients dict={dict.clients} />
      <LocalLawSection dict={dict.localLaw} />
      <Industries dict={dict.industries} />
      <About dict={dict.about} />
      <ContactForm dict={dict.contact} language="en" />
      <Footer dict={dict.footer} lang="en" />
    </main>
  );
}
