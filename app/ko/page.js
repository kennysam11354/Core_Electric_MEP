import { dictionaries } from "@/lib/dictionary";
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

export const metadata = {
    title: "CORE ELECTRIC MEP INDUSTRIES | 전기 공사 전문",
    description: "뉴욕 전역의 상업용, 주거용 및 공공 부문 프로젝트를 수행하는 전기 시공업체.",
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: "/ko",
        languages: {
            en: "/",
            ko: "/ko",
        },
    },
};

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
