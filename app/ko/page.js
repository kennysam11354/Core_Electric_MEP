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

export const metadata = createPageMetadata("ko");

export default function Home() {
    const dict = dictionaries.ko;

    return (
        <main className="client-korean min-h-screen" lang="ko">
            <Navbar dict={dict.navbar} lang="ko" />
            <Hero dict={dict.hero} />
            <Services dict={dict.services} />
            <Projects dict={dict.projects} />
            <Clients dict={dict.clients} />
            <LocalLawSection dict={dict.localLaw} />
            <Industries dict={dict.industries} />
            <About dict={dict.about} />
            <ContactForm dict={dict.contact} />
            <Footer dict={dict.footer} lang="ko" />
        </main>
    );
}
