import { dictionaries } from "./dictionary.js";

const contact = dictionaries.en.contact;

export const site = {
    name: "Core Electric MEP Industries",
    url: "https://www.coreelectricmep.com",
    telephone: "+1-" + contact.phone,
    email: contact.mainEmail,
    address: {
        "@type": "PostalAddress",
        streetAddress: "215-15 Northern Blvd. Suite #304",
        addressLocality: "Bayside",
        addressRegion: "NY",
        postalCode: "11361",
        addressCountry: "US",
    },
};

const pageCopy = {
    en: {
        title: "NYC Electrical Contractor | Core Electric MEP Industries",
        description:
            "MBE-certified, Local #3 union electrical contractor serving New York. Public, commercial and residential electrical work. Based in Bayside, Queens.",
        locale: "en_US",
        alternateLocale: "ko_KR",
    },
    ko: {
        title: "뉴욕 한인 유니온 회원 전기회사 | Core Electric MEP",
        description:
            "뉴욕·퀸즈 베이사이드 기반 한인 유니온 회원 전기회사 Core Electric MEP. MBE 인증 및 LOCAL #3 UNION 소속으로 공공·상업·주거 전기공사, 설비 개선과 유지보수를 제공합니다.",
        locale: "ko_KR",
        alternateLocale: "en_US",
    },
};

export function createPageMetadata(lang = "en") {
    const copy = pageCopy[lang];
    const url = site.url + (lang === "ko" ? "/ko" : "/");
    const image = {
        url: site.url + "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Core Electric MEP Industries — New York electrical contractor",
    };

    return {
        title: copy.title,
        description: copy.description,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        alternates: {
            canonical: url,
            languages: {
                en: site.url + "/",
                ko: site.url + "/ko",
                "x-default": site.url + "/",
            },
        },
        openGraph: {
            type: "website",
            siteName: site.name,
            title: copy.title,
            description: copy.description,
            url,
            locale: copy.locale,
            alternateLocale: [copy.alternateLocale],
            images: [image],
        },
        twitter: {
            card: "summary_large_image",
            title: copy.title,
            description: copy.description,
            images: [{ url: image.url, alt: image.alt }],
        },
    };
}

export function createStructuredData(lang = "en") {
    const copy = pageCopy[lang];
    const url = site.url + (lang === "ko" ? "/ko" : "/");
    const businessId = site.url + "/#business";
    const websiteId = site.url + "/#website";

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Electrician",
                "@id": businessId,
                name: site.name,
                url: site.url + "/",
                description: copy.description,
                telephone: site.telephone,
                email: site.email,
                address: site.address,
                logo: {
                    "@type": "ImageObject",
                    url: site.url + "/apple-touch-icon.png",
                    width: 180,
                    height: 180,
                },
                image: site.url + "/hero-manhattan-mep.png",
                areaServed: { "@type": "State", name: "New York" },
            },
            {
                "@type": "WebSite",
                "@id": websiteId,
                name: site.name,
                url: site.url + "/",
                publisher: { "@id": businessId },
                inLanguage: ["en", "ko"],
            },
            {
                "@type": "WebPage",
                "@id": url + "#webpage",
                url,
                name: copy.title,
                description: copy.description,
                inLanguage: lang,
                isPartOf: { "@id": websiteId },
                about: { "@id": businessId },
            },
        ],
    };
}
