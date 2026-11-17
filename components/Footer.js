export default function Footer({ dict, lang = "en" }) {
    return (
        <footer className="bg-primary text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <span className="text-2xl font-bold tracking-tighter">
                            CORE ELECTRIC MEP INDUSTRIES
                        </span>
                        <p className="mt-4 text-gray-400 max-w-md">
                            {dict.desc}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4 text-secondary">{dict.linksTitle}</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href={lang === "ko" ? "/ko#services" : "/#services"} className="hover:text-white transition-colors">{dict.links.services}</a></li>
                            <li><a href={lang === "ko" ? "/ko#projects" : "/#projects"} className="hover:text-white transition-colors">{dict.links.projects}</a></li>
                            <li><a href={lang === "ko" ? "/ko#clients" : "/#clients"} className="hover:text-white transition-colors">{dict.links.clients}</a></li>
                            <li><a href={lang === "ko" ? "/ko#qualifications" : "/#qualifications"} className="hover:text-white transition-colors">{dict.links.compliance}</a></li>
                            <li><a href={lang === "ko" ? "/ko#about" : "/#about"} className="hover:text-white transition-colors">{dict.links.about}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4 text-secondary">{dict.contactTitle}</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>{dict.address}</li>
                            <li>{dict.phone}</li>
                            <li>{dict.mainEmail}</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
                    <p className="text-gray-500 text-sm text-center lg:text-left">
                        © {new Date().getFullYear()} {dict.copy}
                    </p>
                    <div className="flex max-w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left">
                        <svg aria-hidden="true" className="h-8 w-8 shrink-0 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                <p className="text-sm font-semibold tracking-wide text-gray-200">{dict.licenseHolder}</p>
                                <span className="rounded border border-secondary/20 bg-secondary/10 px-2 py-0.5 text-xs font-semibold text-secondary">{dict.union}</span>
                            </div>
                            <div className="mt-1 flex flex-col gap-1 text-xs leading-relaxed text-gray-400 sm:flex-row sm:items-center sm:gap-3">
                                <span>{dict.license}</span>
                                <span aria-hidden="true" className="hidden h-3 w-px bg-white/15 sm:block"></span>
                                <span>Fully Insured</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
